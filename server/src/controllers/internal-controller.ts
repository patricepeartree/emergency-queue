import { RequestService, QueueService, StatsService } from "../services";
import { twiml, jwt } from "twilio";

import Request from "../model/request";
import { StatsRepository } from "../repository";


export async function getNextRequestInQueue(): Promise<Request | null> {
    const id = await QueueService.getNextIdInQueue();
    if (id) {
        return RequestService.getRequestById(id);
    }
    return null;
}

export function generateResponderCapabilityToken(): string | null {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.RESPONDERS_TWILIO_TWIML_APP_SID) {
        const capability = new jwt.ClientCapability({
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            ttl: 600 // TODO Time To Live, only the time necessary to establish the connection, should also be an env
        });

        capability.addScope(
            new jwt.ClientCapability.OutgoingClientScope({
                applicationSid: process.env.RESPONDERS_TWILIO_TWIML_APP_SID
            })
        );

        return capability.toJwt();
    }

    return null;
}

export function dialPatient(number: string) {
    const voiceResponse = new twiml.VoiceResponse();

    const dial = voiceResponse.dial({
        callerId: process.env.RESPONDERS_TWILIO_NUMBER,
        answerOnBridge: true
    });

    dial.number({
        statusCallback: "/api/internal/call/completed",
        statusCallbackMethod: "POST",
        statusCallbackEvent: ["completed"]
    }, number);

    return voiceResponse;
}

// The completed event is fired when the call is completed, regardless of the termination status: busy, canceled, completed, failed, or no-answer. 
export function processCallCompleted(callStatus: string, duration: string) {
    if (callStatus === "completed") {
        // TODO handle error on updating document
        StatsRepository.updateAvgCallDuration(parseInt(duration));
    }
}

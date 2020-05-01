import { twiml, jwt } from "twilio";

import Request from "../model/request";
import PatientFinishRequest from "../model/api/patient-finish-request";
import { RequestService, QueueService, StatsService, WelfareChecksService } from "../services";
import { StatsRepository, RequestRepository } from "../repository";
import variables from "../utils/environment";

export async function getNextRequestInQueue(): Promise<Request | null> {
    const id = await QueueService.getNextIdInQueue();
    if (id) {
        return RequestService.getRequestById(id);
    }
    return null;
}

export async function getNextRequestInWelfareChecksQueue(): Promise<Request | null> {
    const id = await QueueService.getNextIdInWelfareChecksQueue();
    if (id) {
        return RequestService.getWelfareCheckRequestById(id);
    }
    return null;
}

export function generateResponderCapabilityToken(): string | null {
    if (variables.TWILIO_ACCOUNT_SID && variables.TWILIO_AUTH_TOKEN && variables.RESPONDERS_TWILIO_TWIML_APP_SID) {
        const capability = new jwt.ClientCapability({
            accountSid: variables.TWILIO_ACCOUNT_SID,
            authToken: variables.TWILIO_AUTH_TOKEN,
            ttl: 600 // Time To Live, only the time necessary to establish the connection
        });

        capability.addScope(
            new jwt.ClientCapability.OutgoingClientScope({
                applicationSid: variables.RESPONDERS_TWILIO_TWIML_APP_SID
            })
        );

        return capability.toJwt();
    }

    return null;
}

export function dialPatient(number: string) {
    const voiceResponse = new twiml.VoiceResponse();

    const dial = voiceResponse.dial({
        callerId: variables.RESPONDERS_TWILIO_NUMBER,
        answerOnBridge: true
    });

    dial.number({
        statusCallback: "/api/internal/call/completed",
        statusCallbackMethod: "POST",
        statusCallbackEvent: ["completed"]
    }, number);

    StatsService.handleNewCallInProgress();

    return voiceResponse;
}


export function processCallCompleted(callStatus: string, duration: string) {
    StatsService.handleCallFinished();

    // final call status can be one of "busy", "canceled", "completed", "failed" or "no-answer"
    if (callStatus === "completed") {
        // TODO handle error on updating document
        StatsRepository.updateAvgCallDuration(parseInt(duration));
    }
}

export async function finishRequest(patientFinishRequest: PatientFinishRequest) {
    const { id, notes, welfareFrequency } = patientFinishRequest;
    const date = new Date();

    await RequestRepository.updateRequest(id, date, notes, welfareFrequency);
    if (welfareFrequency) {
        await WelfareChecksService.setWelfareCheck(id, date, welfareFrequency);
    }

    await StatsService.handleRequestFinished();
}

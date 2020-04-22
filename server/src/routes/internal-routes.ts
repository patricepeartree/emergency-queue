import { jwt, twiml } from "twilio";

import { Router, Request, Response } from 'express';
import { InternalController } from '../controllers';


const router = Router();

router.get("/next", async (req: Request, res: Response) => {
    const request = await InternalController.getNextRequestInQueue();
    if (!request) {
        res.sendStatus(204);
    } else {
        res.send(request);
    }
});

router.get("/call/token", async (req: Request, res: Response) => {
    // TODO either validate on server boot that these variables exist, or handle here error
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

        const token = capability.toJwt();

        res.send({
            token: token,
        });
    }
});

router.post("/call/dial", (request, response) => {
    const voiceResponse = new twiml.VoiceResponse();

    const dial = voiceResponse.dial({
        callerId: process.env.RESPONDERS_TWILIO_NUMBER,
        answerOnBridge: true,
        
    });

    dial.number({
        statusCallback: "/api/internal/call/status",
        statusCallbackMethod: "POST",
        statusCallbackEvent: ["answered", "completed", "initiated", "ringing"]
    }, request.body.number);
    
    response.type('text/xml');
    response.send(voiceResponse.toString());
});

router.post("/call/status", (request, response) => {
    console.log(request.body);
});

export default router;

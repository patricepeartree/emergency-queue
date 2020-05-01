import { Router, Request, Response } from 'express';

import {TextController, VoiceController} from "../controllers";

const router = Router();

router.post('/incoming', (req: Request, res: Response) => {
    const twimlResponse = VoiceController.askPatientName();

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse.toString());
});

router.post('/identification', (req: Request, res: Response) => {
    const { Caller, SpeechResult } = req.body || {};
    VoiceController.savePatientTemporarily(Caller,'name', SpeechResult);
    VoiceController.saveRequestTemporarily(Caller,'phoneNumber', Caller);
    const twimlResponse = VoiceController.askPatientAge();

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse.toString());
});

router.post('/age', (req: Request, res: Response) => {
    const { Caller, SpeechResult } = req.body || {};
    VoiceController.savePatientTemporarily(Caller,'age', SpeechResult);
    const twimlResponse = VoiceController.askPatientSymptoms();

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse.toString());
});

router.post('/symptoms', async (req: Request, res: Response) => {
    const { Caller, SpeechResult } = req.body || {};
    VoiceController.saveRequestTemporarily(Caller,'symptoms', SpeechResult);
    const twimlResponse = VoiceController.finishCall();

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse.toString());

    const smsId = await VoiceController.savePermanently(Caller);
    if (smsId){
        await TextController.sendSmsId(smsId, Caller);
    }
});

export default router;

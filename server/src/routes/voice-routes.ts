import { Router, Request, Response } from 'express';

import { VoiceController } from "../controllers";

const router = Router();

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/incoming', (req: Request, res: Response) => {
    const { Caller } = req.body || {};
    VoiceController.saveRequestTemporarily(Caller,'phoneNumber', Caller);
    const twimlResponse = VoiceController.askPatientName();

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse.toString());
});

router.post('/identification', (req: Request, res: Response) => {
    const { Caller, SpeechResult } = req.body || {};
    VoiceController.savePatientTemporarily(Caller,'name', SpeechResult);
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

    await VoiceController.savePermanently(Caller);
});

export default router;

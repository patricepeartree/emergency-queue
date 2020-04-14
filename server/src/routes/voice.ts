import { Router, Request, Response } from 'express';
import { twiml } from 'twilio';

const router = Router();

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/incoming', (req: Request, res: Response) => {
  const twimlResponse = new twiml.VoiceResponse();

  const gather = twimlResponse.gather({
    input: ["speech"],
    action: "/api/voice/identification",
    language: "pt-PT"
  });

  gather.say({
    language: "pt-PT"
  }, 'Quem és tu, miúda?');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twimlResponse.toString());
});

router.post('/identification', (req: Request, res: Response) => {
  const { SpeechResult } = req.body || {};
  console.log(SpeechResult);
});

export default router;

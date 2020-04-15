import { Router, Request, Response } from 'express';
import {
  askPatientAge,
  askPatientName,
  askPatientSymptoms,
  finishCall,
  savePermanently,
  saveTemporarily,
} from "../controllers/voice-controller";

const router = Router();

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

router.get('/incoming', (req: Request, res: Response) => {

  const twimlResponse = askPatientName();

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twimlResponse.toString());
});

router.post('/identification', (req: Request, res: Response) => {

  saveTemporarily('name', req);
  const twimlResponse = askPatientAge();

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twimlResponse.toString());
});

router.post('/age', (req: Request, res: Response) => {

  saveTemporarily('age', req);
  const twimlResponse = askPatientSymptoms();


  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twimlResponse.toString());
});

router.post('/symptoms', (req: Request, res: Response) => {

  saveTemporarily('symptoms', req);

  const twimlResponse = finishCall();

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twimlResponse.toString());

  savePermanently(req);
});

export default router;

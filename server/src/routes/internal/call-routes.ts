import { Router, Request, Response } from 'express';
import { InternalController } from '../../controllers';

const router = Router();

router.get("/token", (req: Request, res: Response) => {
    const token = InternalController.generateResponderCapabilityToken();
    res.send({
        token
    });
});

router.post("/dial", (req: Request, res: Response) => {
    const { number } = req.body || {};
    const twimlResponse = InternalController.dialPatient(number);
    res.type("text/xml");
    res.send(twimlResponse.toString());
});

router.post("/completed", (req: Request, res: Response) => {
    const { CallStatus, CallDuration } = req.body || {};
    InternalController.processCallCompleted(CallStatus, CallDuration);
    res.end();
});

export default router;

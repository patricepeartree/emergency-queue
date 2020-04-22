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

router.get("/call/token", (req: Request, res: Response) => {
    const token = InternalController.generateResponderCapabilityToken();
    res.send({
        token
    });
});

router.post("/call/dial", (req: Request, res: Response) => {
    const { number } = req.body || {};
    const twimlResponse = InternalController.dialPatient(number);
    res.type("text/xml");
    res.send(twimlResponse.toString());
});

router.post("/call/completed", (req: Request, res: Response) => {
    const { CallStatus, CallDuration } = req.body || {};
    InternalController.processCallCompleted(CallStatus, CallDuration);
    res.end();
});

export default router;

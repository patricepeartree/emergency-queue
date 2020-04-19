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

export default router;

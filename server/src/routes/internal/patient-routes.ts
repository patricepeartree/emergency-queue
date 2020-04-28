import { Router, Request, Response } from 'express';

import { InternalController } from '../../controllers';
import PatientFinishRequest from '../../model/api/patient-finish-request';

const router = Router();

router.get("/next", async (req: Request, res: Response) => {
    const request = await InternalController.getNextRequestInQueue();
    if (!request) {
        res.sendStatus(204);
    } else {
        res.send(request);
    }
});

router.post("/finish", async (req: Request, res: Response) => {
    const patientFinishRequest = req.body as PatientFinishRequest;
    console.log(patientFinishRequest);

    await InternalController.finishRequest(patientFinishRequest);
    res.send();
});

export default router;

import { Request, Response, Router } from "express";
import {TextController} from "../controllers";

const router = Router();

router.post('/holdtime', async (req: Request, res: Response) => {
    const smsId = parseInt(req.body.Body);

    const twimlResponse = await TextController.getPatientHoldTime(smsId);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twimlResponse.toString());
});


export default router;

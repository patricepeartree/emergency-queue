import { Router, Request, Response } from 'express';

import VoiceRoutes from "./voice-routes";

const router = Router();

router.use("/voice", VoiceRoutes);

export default router;

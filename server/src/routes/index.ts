import { Router, Request, Response } from 'express';

import VoiceRoutes from "./voice-routes";
import InternalRoutes from "./internal-routes";

const router = Router();

router.use("/voice", VoiceRoutes);
router.use("/internal", InternalRoutes);

export default router;

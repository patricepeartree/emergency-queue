import { Router, Request, Response } from 'express';

import VoiceRoutes from "./voice-routes";
import TextRoutes from "./text-routes";
import InternalRoutes from "./internal";

const router = Router();

router.use("/voice", VoiceRoutes);
router.use("/text", TextRoutes);
router.use("/internal", InternalRoutes);

export default router;

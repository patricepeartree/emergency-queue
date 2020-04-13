import { Router, Request, Response } from 'express';

import TestRoutes from "./test";

const router = Router();

router.use("/test", TestRoutes);

export default router;

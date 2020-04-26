import { Router, Request, Response } from 'express';

import PatientRoutes from "./patient-routes";
import CallRoutes from "./call-routes";

const router = Router();

router.use("/patient", PatientRoutes);
router.use("/call", CallRoutes);

export default router;

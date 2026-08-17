import { Router } from "express";
import {
  createHealthMetric,
  getHealthMetrics,
} from "../controllers/healthMetricController.js";

const router = Router();

router.post("/", createHealthMetric);
router.get("/", getHealthMetrics);

export default router;

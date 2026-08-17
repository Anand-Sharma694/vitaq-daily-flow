import { Router } from "express";
import {
  createHealthProfile,
  getHealthProfile,
  updateHealthProfile,
} from "../controllers/healthProfileController.js";

const router = Router();

router.post("/", createHealthProfile);
router.get("/:userId", getHealthProfile);
router.put("/:userId", updateHealthProfile);

export default router;

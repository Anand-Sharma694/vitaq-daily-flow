import type { Request, Response } from "express";
import { HealthProfileModel } from "../models/HealthProfile.js";

export async function createHealthProfile(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      userId,
      dateOfBirth,
      biologicalSex,
      heightCm,
      weightKg,
    } = req.body;

    if (!userId) {
      res.status(400).json({
        success: false,
        data: null,
        error: "userId is required",
      });
      return;
    }

    const profile = await HealthProfileModel.create({
      userId,
      dateOfBirth,
      biologicalSex,
      heightCm,
      weightKg,
    });

    res.status(201).json({
      success: true,
      data: profile,
      error: null,
    });
  } catch (error) {
    console.error("Failed to create health profile:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to create health profile",
    });
  }
}

export async function getHealthProfile(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { userId } = req.params;

    const profile = await HealthProfileModel.findOne({ userId }).lean();

    if (!profile) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Health profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
      error: null,
    });
  } catch (error) {
    console.error("Failed to get health profile:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to get health profile",
    });
  }
}

export async function updateHealthProfile(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { userId } = req.params;

    const profile = await HealthProfileModel.findOneAndUpdate(
      { userId },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!profile) {
      res.status(404).json({
        success: false,
        data: null,
        error: "Health profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: profile,
      error: null,
    });
  } catch (error) {
    console.error("Failed to update health profile:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to update health profile",
    });
  }
}

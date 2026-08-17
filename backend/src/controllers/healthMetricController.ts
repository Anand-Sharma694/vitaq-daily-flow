import type { Request, Response } from "express";
import { HealthMetricModel } from "../models/HealthMetric.js";

export async function createHealthMetric(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const {
      userId,
      metricType,
      value,
      unit,
      recordedAt,
      source,
    } = req.body;

    if (
      !userId ||
      !metricType ||
      value === undefined ||
      !unit ||
      !recordedAt
    ) {
      res.status(400).json({
        success: false,
        data: null,
        error: "userId, metricType, value, unit and recordedAt are required",
      });
      return;
    }

    const metric = await HealthMetricModel.create({
      userId,
      metricType,
      value,
      unit,
      recordedAt,
      source,
    });

    res.status(201).json({
      success: true,
      data: metric,
      error: null,
    });
  } catch (error) {
    console.error("Failed to create health metric:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to create health metric",
    });
  }
}

export async function getHealthMetrics(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { userId } = req.query;

    if (typeof userId !== "string" || !userId) {
      res.status(400).json({
        success: false,
        data: null,
        error: "userId query parameter is required",
      });
      return;
    }

    const metrics = await HealthMetricModel.find({ userId })
      .sort({ recordedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: metrics,
      error: null,
    });
  } catch (error) {
    console.error("Failed to get health metrics:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to get health metrics",
    });
  }
}

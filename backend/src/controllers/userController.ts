import type { Request, Response } from "express";
import { UserModel } from "../models/User.js";

export async function createUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({
        success: false,
        data: null,
        error: "name and email are required",
      });
      return;
    }

    const user = await UserModel.create({
      name,
      email,
    });

    res.status(201).json({
      success: true,
      data: user,
      error: null,
    });
  } catch (error) {
    console.error("Failed to create user:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to create user",
    });
  }
}

export async function getUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const user = await UserModel.findById(req.params.id).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        data: null,
        error: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      data: user,
      error: null,
    });
  } catch (error) {
    console.error("Failed to get user:", error);

    res.status(500).json({
      success: false,
      data: null,
      error: "Failed to get user",
    });
  }
}

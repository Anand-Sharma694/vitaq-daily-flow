import { Schema, model, type InferSchemaType } from "mongoose";

const healthProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    dateOfBirth: {
      type: Date,
    },
    biologicalSex: {
      type: String,
      enum: ["female", "male", "other", "prefer_not_to_say"],
    },
    heightCm: {
      type: Number,
      min: 30,
      max: 300,
    },
    weightKg: {
      type: Number,
      min: 1,
      max: 500,
    },
  },
  {
    timestamps: true,
  },
);

export type HealthProfile = InferSchemaType<typeof healthProfileSchema>;

export const HealthProfileModel = model<HealthProfile>(
  "HealthProfile",
  healthProfileSchema,
);

import { Schema, model, type InferSchemaType } from "mongoose";

const healthMetricSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    metricType: {
      type: String,
      required: true,
      enum: [
        "heart_rate",
        "blood_pressure",
        "blood_oxygen",
        "temperature",
        "steps",
        "sleep",
        "glucose",
      ],
      index: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
    },
    recordedAt: {
      type: Date,
      required: true,
      index: true,
    },
    source: {
      type: String,
      enum: ["manual", "device", "integration", "ai"],
      default: "manual",
    },
  },
  {
    timestamps: true,
  },
);

healthMetricSchema.index({ userId: 1, metricType: 1, recordedAt: -1 });

export type HealthMetric = InferSchemaType<typeof healthMetricSchema>;

export const HealthMetricModel = model<HealthMetric>(
  "HealthMetric",
  healthMetricSchema,
);

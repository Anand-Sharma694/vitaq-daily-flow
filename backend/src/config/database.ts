import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not configured");
}

if (!MONGODB_DB_NAME) {
  throw new Error("MONGODB_DB_NAME is not configured");
}

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI!, {
    dbName: MONGODB_DB_NAME,
  });

  console.log(`MongoDB connected: ${MONGODB_DB_NAME}`);
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}

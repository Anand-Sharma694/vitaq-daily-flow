import express from "express";
import { connectDatabase } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      service: "livora-backend",
      status: "healthy",
    },
    error: null,
    requestId: null,
  });
});

app.use("/api/v1/users", userRoutes);

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`LIVORA backend running on port ${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start LIVORA backend:", error);
  process.exit(1);
});
import express from "express";

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

app.listen(PORT, () => {
  console.log(`LIVORA backend running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import activityRoutes from "./routes/activities.js";
import calcRoutes from "./routes/calculations.js";
import recRoutes from "./routes/recommendations.js";
import gameRoutes from "./routes/gamification.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, service: "CFT Backend" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/calculations", calcRoutes);
app.use("/api/recommendations", recRoutes);
app.use("/api/gamification", gameRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/carbon";

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
});

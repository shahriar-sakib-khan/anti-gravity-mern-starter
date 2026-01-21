import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { seedUsers } from "./config/seed";
import authRoutes from "./features/auth/auth.routes";
import userRoutes from './features/user/user.routes';
import cookieParser from "cookie-parser";
import { logger, morganMiddleware } from "./config/logger";
import { authenticate } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(morganMiddleware);
app.use(express.json());
app.use(cookieParser());

// Database and Seeding
connectDB().then(() => {
  seedUsers();
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from API" });
});

app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

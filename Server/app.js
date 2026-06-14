import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Dbconnection from "./Config/DbConfig.js";
import cors from "cors";

// importing route middlewares
import userRoutes from "./Routes/userRoutes.js";
import questionRoutes from "./Routes/questionsRoutes.js";
import answerRoutes from "./Routes/answerRoutes.js";

// importing global middlewares
import authMiddleware from "./Middleware/authMiddleware.js";
import notFoundMiddleware from "./Middleware/notFoundMiddleware.js";
import errorMiddleware from "./Middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 5000;

// cors origin configuration all *
app.use(cors({ origin: true, credentials: true }));

// Middleware to parse json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);

// answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

// Handle unknown routes
app.use(notFoundMiddleware);

// Global Error Handler (must be the last middleware)
app.use(errorMiddleware);

async function startServer() {
  try {
    await Dbconnection.execute("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection failed:", err.message);
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();

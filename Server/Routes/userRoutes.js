import express from "express";
const router = express.Router();

// importing controllers
import {
  registerUser,
  loginUser,
  checkUser,
} from "../Controllers/userControllers.js";

import authMiddleware from "../Middleware/authMiddleware.js";

// register route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// check user route
router.get("/check", authMiddleware, checkUser);

export default router;

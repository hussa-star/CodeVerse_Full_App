// ============================================================
// userControllers.js — Thin controllers for user routes
// ============================================================
// Controllers are now 3-step functions:
//   1. Validate input (Validator layer)
//   2. Call service (Service layer does the logic)
//   3. Send response
//
// No try/catch needed — asyncHandler catches errors automatically
// and passes them to errorMiddleware via next(err).
// ============================================================

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../Utils/asyncHandler.js";
import {
  validateRegister,
  validateLogin,
} from "../Validators/userValidator.js";
import {
  registerUserService,
  loginUserService,
} from "../Services/userService.js";

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  // 1. Get data from frontend
  const { username, firstname, lastname, email, password } = req.body;

  // 2. Validate input — throws AppError if invalid
  validateRegister({ username, firstname, lastname, email, password });

  // 3. Register user (hashes password, checks duplicates, inserts into DB)
  await registerUserService(username, firstname, lastname, email, password);

  // 4. Success response
  return res.status(StatusCodes.CREATED).json({
    message: "User registered successfully",
  });
});

// Login an existing user
const loginUser = asyncHandler(async (req, res) => {
  // 1. Get data from frontend
  const { email, password } = req.body;

  // 2. Validate input — throws AppError if invalid
  validateLogin({ email, password });

  // 3. Login user (checks credentials, returns JWT token)
  const { token } = await loginUserService(email, password);

  // 4. Success response
  return res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    token,
  });
});

// Check logged-in user (used by frontend AuthProvider to verify token)
const checkUser = asyncHandler(async (req, res) => {
  // Get logged-in user info (injected into req.user by authMiddleware)
  const { username, userid } = req.user;

  return res.status(StatusCodes.OK).json({
    message: "User is authenticated",
    username,
    userid,
  });
});

export { registerUser, loginUser, checkUser };

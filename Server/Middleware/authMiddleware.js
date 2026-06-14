// ============================================================
// authMiddleware.js — JWT token verification
// ============================================================
// Runs BEFORE protected route controllers.
// Checks for a valid Bearer token in the Authorization header.
// If valid → injects user info into req.user and calls next()
// If invalid → throws error to errorMiddleware
// ============================================================

import jwt from "jsonwebtoken";
import AppError from "../Errors/AppError.js";
import asyncHandler from "../Utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";

// Verify JWT token and inject user into request
const authMiddleware = asyncHandler(async (req, res, next) => {
  // 1. Get token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  // 2. Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // 3. Verify token and attach user to request
  const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { username, userid };

  // 4. Pass to next middleware or controller
  next();
});

export default authMiddleware;

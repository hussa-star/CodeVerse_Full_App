// ============================================================
// errorMiddleware.js — Global error handler
// ============================================================
// This is the LAST middleware registered in app.js.
// Express knows it's an error handler because it has 4 params: (err, req, res, next)
//
// FLOW:
//   1. Controller throws AppError (e.g. "User not found", 404)
//   2. asyncHandler catches it and calls next(err)
//   3. Express skips all normal middleware and comes HERE
//   4. We send the right HTTP response based on error type
//
// TWO kinds of errors we handle:
//   - Operational errors (AppError) → safe to show message to client
//   - Programming errors (TypeError etc.) → hide details, log internally
// ============================================================

import AppError from "../Errors/AppError.js";

function errorMiddleware(err, req, res, next) {
  // Handle JWT verification errors (invalid/expired token)
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Handle our custom operational errors (thrown with AppError)
  // Safe to show the message to the client
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Handle unexpected programming errors (bugs, typos, etc.)
  // Log internally but send a generic message to the client
  console.error("Unexpected error:", err);

  return res.status(500).json({
    message: "Internal Server Error",
  });
}

export default errorMiddleware;

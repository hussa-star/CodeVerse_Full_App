// ============================================================
// AppError.js — Custom error class for operational errors
// ============================================================
// "Operational errors" = predictable errors we handle on purpose
//   e.g. "User not found" (404), "Invalid password" (400)
// vs "programming errors" = unexpected bugs (TypeError, etc.)
//
// Why extend Error?
//   Gives us stack trace + message like a normal Error,
//   but we also attach a statusCode so the error middleware
//   knows which HTTP status to send back.
// ============================================================

class AppError extends Error {
  constructor(message, statusCode) {
    // Call parent Error constructor (sets this.message + stack trace)
    super(message);

    // Attach the HTTP status code to this error
    this.statusCode = statusCode;

    // Flag so errorMiddleware knows this is a safe, expected error
    // (not a surprise bug) — only operational errors get isOperational = true
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

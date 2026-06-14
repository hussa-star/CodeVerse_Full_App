// ============================================================
// questionValidator.js — Input validation for question routes
// ============================================================
// Checks that required fields exist before the Service layer runs.
// Throws AppError so asyncHandler can pass it to errorMiddleware.
// ============================================================

import AppError from "../Errors/AppError.js";

// Validate post question fields
// title and description are required — tag is optional
function validatePostQuestion({ title, description }) {
  // 1. Check required fields
  if (!title || !description) {
    throw new AppError("Please provide all required fields", 400);
  }
}

export { validatePostQuestion };

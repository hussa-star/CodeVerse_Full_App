// ============================================================
// answerValidator.js — Input validation for answer routes
// ============================================================
// Checks that required fields exist before the Service layer runs.
// Throws AppError so asyncHandler can pass it to errorMiddleware.
// ============================================================

import AppError from "../Errors/AppError.js";

// Validate post answer fields
// Both answer text and questionid are required
function validatePostAnswer({ answer, questionid }) {
  // 1. Check required fields
  if (!answer || !questionid) {
    throw new AppError("Please provide answer and questionid", 400);
  }
}

export { validatePostAnswer };

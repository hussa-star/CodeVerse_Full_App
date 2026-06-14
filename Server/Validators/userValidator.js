// ============================================================
// userValidator.js — Input validation for user routes
// ============================================================
// The Validator layer's ONLY job is to check that incoming
// request data is valid BEFORE any business logic runs.
//
// We throw AppError (not return res.status) because the
// asyncHandler will catch it and pass it to errorMiddleware,
// which sends the correct HTTP response automatically.
// ============================================================

import AppError from "../Errors/AppError.js";

// Validate registration fields
// Throws AppError if anything is missing or invalid
function validateRegister({ username, firstname, lastname, email, password }) {
  // 1. Check required fields
  if (!username || !firstname || !lastname || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  // 2. Check password length
  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters long", 400);
  }
}

// Validate login fields
// Throws AppError if email or password is missing
function validateLogin({ email, password }) {
  // 1. Check required fields
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
}

export { validateRegister, validateLogin };

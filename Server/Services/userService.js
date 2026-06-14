// ============================================================
// userService.js — Business logic for user operations
// ============================================================
// The Service layer sits between Controller and Model.
// It handles the "thinking" — what to check, what to hash,
// when to throw errors, what data to return.
//
// FLOW: Controller → Service → Model → Database
// ============================================================

import bcrypt from "bcrypt";
import AppError from "../Errors/AppError.js";
import generateToken from "../Utils/generateToken.js";
import {
  findUserByUsernameOrEmail,
  findUserByEmail,
  createUser,
} from "../Models/userModel.js";

// Handle registration logic
// Called by the registerUser controller
async function registerUserService(username, firstname, lastname, email, password) {
  // 1. Check if user already exists
  const existingUser = await findUserByUsernameOrEmail(username, email);

  if (existingUser.length > 0) {
    throw new AppError("User with this account already exists", 400);
  }

  // 2. Encrypt password before storing
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 3. Insert user into database
  await createUser(username, firstname, lastname, email, hashedPassword);
}

// Handle login logic
// Returns the JWT token if credentials are valid
async function loginUserService(email, password) {
  // 1. Check if user exists
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  // 2. Compare submitted password with hashed password in database
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError("Invalid email or password", 400);
  }

  // 3. Create token
  const token = generateToken({
    username: user.username,
    userid: user.userid,
  });

  return { token };
}

export { registerUserService, loginUserService };

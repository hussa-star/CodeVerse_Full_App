// ============================================================
// userModel.js — Raw SQL queries for the users table
// ============================================================
// The Model layer's ONLY job is to talk to the database.
// No business logic here — just SQL queries that return data.
// The Service layer decides what to DO with that data.
// ============================================================

import dbConnection from "../Config/DbConfig.js";

// Check if a user already exists by username OR email
// Used during registration to prevent duplicate accounts
async function findUserByUsernameOrEmail(username, email) {
  const [rows] = await dbConnection.query(
    "SELECT username, userid FROM users WHERE username=? OR email = ?",
    [username, email],
  );
  return rows; // returns array — empty [] means no existing user
}

// Find a single user by email (for login)
// Returns the user object with hashed password so we can compare
async function findUserByEmail(email) {
  const [rows] = await dbConnection.query(
    "SELECT username, userid, password FROM users WHERE email = ?",
    [email],
  );
  return rows[0] || null; // return first match or null if not found
}

// Insert a new user into the database
// Password must already be hashed before calling this
async function createUser(username, firstname, lastname, email, hashedPassword) {
  await dbConnection.query(
    "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
    [username, firstname, lastname, email, hashedPassword],
  );
}

export { findUserByUsernameOrEmail, findUserByEmail, createUser };

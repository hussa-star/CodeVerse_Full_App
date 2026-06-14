// ============================================================
// generateToken.js — Creates JWT tokens
// ============================================================
// Extracted from loginUser controller so we have one single place
// to manage token creation. If we ever need to change expiry,
// algorithm, or secret — we only update ONE file.
// ============================================================

import jwt from "jsonwebtoken";

// Create and return a signed JWT token
// payload = { username, userid } — the data stored inside the token
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d", // token expires after 1 day
  });
}

export default generateToken;

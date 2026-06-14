// ============================================================
// answerModel.js — Raw SQL queries for the answers table
// ============================================================
// Only database access here. No validation, no business logic.
// Returns raw data to the Service layer for processing.
// ============================================================

import dbConnection from "../Config/DbConfig.js";

// Check if the same user already submitted the exact same answer
// for the same question — prevents duplicate answer submissions
async function findDuplicateAnswer(userid, questionid, answer) {
  const [rows] = await dbConnection.query(
    "SELECT * FROM answers WHERE userid = ? AND questionid = ? AND answer = ?",
    [userid, questionid, answer],
  );
  return rows; // empty [] means no duplicate
}

// Insert a new answer into the database
// answerid is auto-incremented by MySQL (no UUID needed here)
async function insertAnswer(userid, questionid, answer) {
  await dbConnection.query(
    "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
    [userid, questionid, answer],
  );
}

// Get all answers for a specific question, joined with user info
// JOIN with users table so we get username/firstname/lastname
async function getAnswersByQuestionId(questionid) {
  const [rows] = await dbConnection.query(
    `SELECT 
        a.answerid,
        a.answer,
        a.questionid,
        a.userid,
        u.username,
        u.firstname,
        u.lastname
      FROM answers a
      JOIN users u ON a.userid = u.userid
      WHERE a.questionid = ?`,
    [questionid],
  );
  return rows;
}

export { findDuplicateAnswer, insertAnswer, getAnswersByQuestionId };

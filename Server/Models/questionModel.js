// ============================================================
// questionModel.js — Raw SQL queries for the questions table
// ============================================================
// Only database access here. No validation, no business logic.
// Returns raw data to the Service layer for processing.
// ============================================================

import dbConnection from "../Config/DbConfig.js";

// Get a paginated list of questions with user info and answer counts
// Uses SQL JOIN to pull in username from users table
// Uses subquery to count how many answers each question has
async function getAllQuestionsFromDb(limit, offset) {
  const [rows] = await dbConnection.query(
    `SELECT 
        q.id,
        q.questionid,
        q.title,
        q.description AS content,
        q.userid,
        u.username,
        u.firstname,
        u.lastname,
        (SELECT COUNT(*) FROM answers a WHERE a.questionid = q.questionid) AS total_answers
      FROM questions q
      JOIN users u ON q.userid = u.userid
      ORDER BY q.id DESC
      LIMIT ? OFFSET ?`,
    [limit, offset],
  );
  return rows;
}

// Get the total number of questions (used to calculate total pages)
async function getTotalQuestionsCount() {
  const [rows] = await dbConnection.query(
    "SELECT COUNT(*) AS total FROM questions",
  );
  return rows[0].total;
}

// Get a single question by its UUID questionid (not the auto-increment id)
async function getQuestionById(questionId) {
  const [rows] = await dbConnection.query(
    `SELECT 
        q.questionid,
        q.title,
        q.description AS content,
        q.userid,
        u.username,
        u.firstname,
        u.lastname
      FROM questions q
      JOIN users u ON q.userid = u.userid
      WHERE q.questionid = ?`,
    [questionId],
  );
  return rows[0] || null; // return first match or null if not found
}

// Check if a question with the same title AND description already exists
// Used to prevent duplicate question submissions
async function findDuplicateQuestion(title, description) {
  const [rows] = await dbConnection.query(
    "SELECT * FROM questions WHERE title = ? AND description = ?",
    [title, description],
  );
  return rows; // empty [] means no duplicate
}

// Insert a new question into the database
// questionid is a UUID generated in the Service layer (not auto-increment)
async function insertQuestion(userid, questionid, title, description, tag) {
  await dbConnection.query(
    "INSERT INTO questions (userid, questionid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
    [userid, questionid, title, description, tag],
  );
}

export {
  getAllQuestionsFromDb,
  getTotalQuestionsCount,
  getQuestionById,
  findDuplicateQuestion,
  insertQuestion,
};

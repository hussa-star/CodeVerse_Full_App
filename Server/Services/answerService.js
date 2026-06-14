// ============================================================
// answerService.js — Business logic for answer operations
// ============================================================
// Handles duplicate checking and decides when to throw errors.
// Calls Models for raw database access.
// ============================================================

import AppError from "../Errors/AppError.js";
import {
  findDuplicateAnswer,
  insertAnswer,
  getAnswersByQuestionId,
} from "../Models/answerModel.js";

// Post a new answer
async function postAnswerService(userid, questionid, answer) {
  // 1. Check if same answer was already submitted by this user
  const existingAnswer = await findDuplicateAnswer(userid, questionid, answer);

  if (existingAnswer.length > 0) {
    throw new AppError(
      "You have already submitted this exact answer for this question.",
      400,
    );
  }

  // 2. Insert answer into database
  await insertAnswer(userid, questionid, answer);
}

// Get all answers for a specific question
async function getAllAnswersService(questionid) {
  // 1. Fetch answers from database
  const answers = await getAnswersByQuestionId(questionid);

  // 2. If no answers found, throw error
  if (answers.length === 0) {
    throw new AppError(
      "No answers found for this question Please be the first to answer!",
      404,
    );
  }

  return answers;
}

export { postAnswerService, getAllAnswersService };

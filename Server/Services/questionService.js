// ============================================================
// questionService.js — Business logic for question operations
// ============================================================
// Handles the thinking: pagination math, duplicate checks,
// UUID generation, deciding when to throw errors.
// Calls Models for raw database access.
// ============================================================

import { v4 as uuidv4 } from "uuid";
import AppError from "../Errors/AppError.js";
import {
  getAllQuestionsFromDb,
  getTotalQuestionsCount,
  getQuestionById,
  findDuplicateQuestion,
  insertQuestion,
} from "../Models/questionModel.js";

// Get paginated questions for the home feed
// Returns questions array + totalPages for the frontend to use
async function getAllQuestionsService(page, limit) {
  // 1. Calculate offset for pagination
  const offset = (page - 1) * limit;

  // 2. Fetch questions and total count from the database
  const questions = await getAllQuestionsFromDb(limit, offset);
  const total = await getTotalQuestionsCount();

  // 3. Calculate total pages
  const totalPages = Math.ceil(total / limit);

  // 4. If no questions found, throw error
  if (questions.length === 0) {
    throw new AppError("No questions found", 404);
  }

  return { questions, totalPages };
}

// Get a single question by its UUID
async function getSingleQuestionService(questionId) {
  // 1. Fetch question from database
  const question = await getQuestionById(questionId);

  // 2. If question not found, throw error
  if (!question) {
    throw new AppError("The requested question could not be found", 404);
  }

  return question;
}

// Post a new question
async function postQuestionService(userid, title, description, tag) {
  // 1. Handle optional tag
  const tagToInsert = tag ? tag : null;

  // 2. Check if question already exists (duplicate prevention)
  const existingQuestion = await findDuplicateQuestion(title, description);

  if (existingQuestion.length > 0) {
    throw new AppError("You have already submitted this question.", 400);
  }

  // 3. Create unique question id (UUID — not auto-increment)
  const questionid = uuidv4();

  // 4. Insert question into database
  await insertQuestion(userid, questionid, title, description, tagToInsert);
}

export { getAllQuestionsService, getSingleQuestionService, postQuestionService };

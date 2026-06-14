// ============================================================
// questionsControllers.js — Thin controllers for question routes
// ============================================================
// Controllers are now 3-step functions:
//   1. Validate input (Validator layer)
//   2. Call service (Service layer does the logic)
//   3. Send response
//
// No try/catch needed — asyncHandler catches errors automatically
// and passes them to errorMiddleware via next(err).
// ============================================================

import { StatusCodes } from "http-status-codes";
import asyncHandler from "../Utils/asyncHandler.js";
import { validatePostQuestion } from "../Validators/questionValidator.js";
import {
  getAllQuestionsService,
  getSingleQuestionService,
  postQuestionService,
} from "../Services/questionService.js";

// Get all questions (paginated)
const getAllQuestions = asyncHandler(async (req, res) => {
  // 1. Get pagination parameters from query string
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  // 2. Get questions and total pages from service
  const { questions, totalPages } = await getAllQuestionsService(page, limit);

  // 3. Send response
  return res.status(StatusCodes.OK).json({
    questions,
    totalPages,
  });
});

// Get a single question by questionId URL param
const getSingleQuestion = asyncHandler(async (req, res) => {
  // 1. Get questionId from URL
  const { questionId } = req.params;

  // 2. Get question from service
  const question = await getSingleQuestionService(questionId);

  // 3. Send response
  return res.status(StatusCodes.OK).json({
    question,
  });
});

// Post a new question
const postQuestion = asyncHandler(async (req, res) => {
  // 1. Get data from frontend
  const { title, description, tag } = req.body;

  // 2. Validate input — throws AppError if invalid
  validatePostQuestion({ title, description });

  // 3. Get logged-in user (injected by authMiddleware)
  const { userid } = req.user;

  // 4. Post question (checks duplicates, creates UUID, inserts into DB)
  await postQuestionService(userid, title, description, tag);

  // 5. Success response
  return res.status(StatusCodes.CREATED).json({
    message: "Question created successfully",
  });
});

export { getAllQuestions, getSingleQuestion, postQuestion };

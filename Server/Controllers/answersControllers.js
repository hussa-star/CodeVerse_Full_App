// ============================================================
// answersControllers.js — Thin controllers for answer routes
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
import { validatePostAnswer } from "../Validators/answerValidator.js";
import { postAnswerService, getAllAnswersService } from "../Services/answerService.js";

// Post a new answer
const postAnswer = asyncHandler(async (req, res) => {
  // 1. Get data from frontend
  const { answer, questionid } = req.body;

  // 2. Validate input — throws AppError if invalid
  validatePostAnswer({ answer, questionid });

  // 3. Get logged-in user (injected by authMiddleware)
  const { userid } = req.user;

  // 4. Post answer (checks duplicates, inserts into DB)
  await postAnswerService(userid, questionid, answer);

  // 5. Success response
  return res.status(StatusCodes.CREATED).json({
    message: "Answer posted successfully",
  });
});

// Get all answers for a specific question
const getAllAnswers = asyncHandler(async (req, res) => {
  // 1. Get questionid from URL
  const { questionid } = req.params;

  // 2. Get answers from service
  const answers = await getAllAnswersService(questionid);

  // 3. Send response
  return res.status(StatusCodes.OK).json({
    answers,
  });
});

export { postAnswer, getAllAnswers };

import express from "express";
const router = express.Router();

// importing controllers
import {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} from "../Controllers/questionsControllers.js";

// getting all questions
router.get("/", getAllQuestions);

// getting single question
router.get("/:questionId", getSingleQuestion);

// posting a question
router.post("/", postQuestion);

export default router;

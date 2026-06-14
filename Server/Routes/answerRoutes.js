import express from "express";
const router = express.Router();

// importing controllers
import { postAnswer, getAllAnswers } from "../Controllers/answersControllers.js";

// answer routes

// posting an answer
router.post("/", postAnswer);

// getting all answers
router.get("/:questionid", getAllAnswers);

export default router;

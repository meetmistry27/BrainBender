// const express = require('express');
import {Router} from "express";
const router = Router();
//import Quiz from '../models/quizzesModel.js';
import { getAllQuizzes } from "../controllers/quizController.js";
import { createQuiz } from "../controllers/quizController.js";
import { updateQuizById } from "../controllers/quizController.js";
import { getQuizById } from "../controllers/quizController.js";
import { deleteQuizById } from "../controllers/quizController.js";

// GET all quizzes
router.get('/get', getAllQuizzes);

// GET a quiz by ID
router.get('/get/:id', getQuizById);

// POST a new quiz
router.post('/create',createQuiz);

// PUT (update) a quiz by ID
router.put('/update/:id', updateQuizById);

// DELETE a quiz by ID
router.delete('/delete/:id', deleteQuizById);

export default router;

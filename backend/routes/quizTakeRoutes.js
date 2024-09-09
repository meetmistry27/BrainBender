import {Router} from "express";
const router = Router();
//import QuizTake from '../models/quiz_takesModel.js';
import { getAllQuizTakes } from '../controllers/quizTakeController.js';
import { createQuizTake } from '../controllers/quizTakeController.js';
import { getQuizTakeById } from '../controllers/quizTakeController.js';
import { updateQuizTakeById } from "../controllers/quizTakeController.js";
import { deleteQuizTakeById } from "../controllers/quizTakeController.js";
// GET all quiz takes
router.get('/get', getAllQuizTakes);
router.get('/get/:id', getQuizTakeById);

// POST a new quiz take
router.post('/create', createQuizTake);

// PUT (update) a quiz take by ID
router.put('/update/:id', updateQuizTakeById);

// DELETE a quiz take by ID
router.delete('/delete/:id',deleteQuizTakeById);

export default router;

import { Router } from "express";
import { 
    getAllQuizzes, 
    getQuizById, 
    createQuiz, 
    updateQuizById, 
    deleteQuizById 
} from "../controllers/quizController.ts";

const router = Router();

// GET all quizzes
router.get('/get', getAllQuizzes);

// GET a quiz by ID
router.get('/get/:id', getQuizById);

// POST a new quiz
router.post('/create', createQuiz);

// PUT (update) a quiz by ID
router.put('/update/:id', updateQuizById);

// DELETE a quiz by ID
router.delete('/delete/:id', deleteQuizById);

export default router;

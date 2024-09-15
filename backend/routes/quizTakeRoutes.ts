import { Router } from 'express';
import { 
    getAllQuizTakes, 
    createQuizTake, 
    getQuizTakeById, 
    updateQuizTakeById, 
    deleteQuizTakeById 
} from '../controllers/quizTakeController.ts';
import { validateQuizTakeCreation, validateQuizTakeUpdate } from '../middleware/validationMiddleware.ts';
import { handleErrors } from '../middleware/errorMiddleware.ts';

const router = Router();

// GET all quiz takes
router.get('/get', handleErrors(getAllQuizTakes));

// GET a quiz take by ID
router.get('/get/:id', handleErrors(getQuizTakeById));

// POST a new quiz take
router.post('/create', validateQuizTakeCreation, handleErrors(createQuizTake));

// PUT (update) a quiz take by ID
router.put('/update/:id', validateQuizTakeUpdate, handleErrors(updateQuizTakeById));

// DELETE a quiz take by ID
router.delete('/delete/:id', handleErrors(deleteQuizTakeById));

export default router;

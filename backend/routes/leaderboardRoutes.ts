import { Router, Request, Response } from 'express';
import { 
    getAllLeaderboardEntries, 
    getLeaderboardEntryById, 
    createLeaderboardEntry, 
    updateLeaderboardEntryById, 
    deleteLeaderboardEntryById 
} from '../controllers/leaderboardController.ts';
import { validateLeaderboardEntryCreation, validateLeaderboardEntryUpdate } from '../middleware/validationMiddleware.ts';
import { handleErrors } from '../middleware/errorMiddleware.ts';

const router = Router();

// GET all leaderboard entries
router.get('/get', handleErrors(getAllLeaderboardEntries));

// GET a leaderboard entry by ID
router.get('/get/:id', handleErrors(getLeaderboardEntryById));

// POST a new leaderboard entry
router.post('/create', validateLeaderboardEntryCreation, handleErrors(createLeaderboardEntry));

// PUT (update) a leaderboard entry by ID
router.put('/update/:id', validateLeaderboardEntryUpdate, handleErrors(updateLeaderboardEntryById));

// DELETE a leaderboard entry by ID
router.delete('/delete/:id', handleErrors(deleteLeaderboardEntryById));

export default router;

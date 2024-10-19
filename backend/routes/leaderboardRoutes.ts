// import { Router, Request, Response } from 'express';
// import { 
//     getAllLeaderboardEntries, 
//     getLeaderboardEntryById, 
//     createOrUpdateLeaderboardEntry, 
//     updateLeaderboardEntryById, 
//     deleteLeaderboardEntryById 
// } from '../controllers/leaderboardController.ts';
// import { validateLeaderboardEntryCreation, validateLeaderboardEntryUpdate } from '../middleware/validationMiddleware.ts';
// import { handleErrors } from '../middleware/errorMiddleware.ts';

// const router = Router();

// // GET all leaderboard entries
// router.get('/get/:quizId', handleErrors(getAllLeaderboardEntries));

// // GET a leaderboard entry by ID
// router.get('/get/:id', handleErrors(getLeaderboardEntryById));

// // POST a new leaderboard entry
// router.post('/create', validateLeaderboardEntryCreation, handleErrors(createOrUpdateLeaderboardEntry));

// // PUT (update) a leaderboard entry by ID
// router.put('/update/:id', validateLeaderboardEntryUpdate, handleErrors(updateLeaderboardEntryById));

// // DELETE a leaderboard entry by ID
// router.delete('/delete/:id', handleErrors(deleteLeaderboardEntryById));

// export default router;
// import { Router, Request, Response } from 'express';
// import { 
//     getAllLeaderboardEntries, 
//     getLeaderboardEntryById, 
//     createOrUpdateLeaderboardEntry, 
//     updateLeaderboardEntryById, 
//     deleteLeaderboardEntryById,
//     getLeaderboardEntriesByUserAndQuiz
// } from '../controllers/leaderboardController.ts';
// import { validateLeaderboardEntryCreation, validateLeaderboardEntryUpdate } from '../middleware/validationMiddleware.ts';
// import { handleErrors } from '../middleware/errorMiddleware.ts';

// const router = Router();

// // Base URL: http://localhost:5000/leaderboards

// // GET all leaderboard entries for a specific quiz
// router.get('/:quizId', handleErrors(getAllLeaderboardEntries)); // Changed to expect quizId

// // GET a leaderboard entry by ID
// router.get('/entry/:id', handleErrors(getLeaderboardEntryById)); // Changed URL structure to be more explicit

// router.get('/entries', handleErrors(getLeaderboardEntriesByUserAndQuiz));

// // POST a new leaderboard entry
// router.post('/create', validateLeaderboardEntryCreation, handleErrors(createOrUpdateLeaderboardEntry));

// // PUT (update) a leaderboard entry by ID
// router.put('/entry/:id', validateLeaderboardEntryUpdate, handleErrors(updateLeaderboardEntryById)); // Changed URL structure to be more explicit

// // DELETE a leaderboard entry by ID
// router.delete('/entry/:id', handleErrors(deleteLeaderboardEntryById)); // Changed URL structure to be more explicit

// export default router;
import { Router } from 'express';
import { 
    getAllLeaderboardEntries, 
    getLeaderboardEntryById, 
    createOrUpdateLeaderboardEntry, 
    updateLeaderboardEntryById, 
    deleteLeaderboardEntryById,
    getLeaderboardEntriesByUserAndQuiz
} from '../controllers/leaderboardController.ts';
import { validateLeaderboardEntryCreation, validateLeaderboardEntryUpdate } from '../middleware/validationMiddleware.ts';
import { handleErrors } from '../middleware/errorMiddleware.ts';

const router = Router();

// Base URL: http://localhost:5000/leaderboards

// GET all leaderboard entries for a specific quiz
router.get('/:quiz_id', handleErrors(getAllLeaderboardEntries)); // Using quiz_id as route parameter

// GET a leaderboard entry by ID
router.get('/entry/:id', handleErrors(getLeaderboardEntryById)); // Explicit entry ID route

// GET leaderboard entries by user ID and quiz ID
router.get('/entries', handleErrors(getLeaderboardEntriesByUserAndQuiz)); // Keeping this as is

// POST a new leaderboard entry
router.post('/create', validateLeaderboardEntryCreation, handleErrors(createOrUpdateLeaderboardEntry));

// PUT (update) a leaderboard entry by ID
router.put('/entry/:id', validateLeaderboardEntryUpdate, handleErrors(updateLeaderboardEntryById));

// DELETE a leaderboard entry by ID
router.delete('/entry/:id', handleErrors(deleteLeaderboardEntryById));

export default router;

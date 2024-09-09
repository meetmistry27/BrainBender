import {Router} from "express";
const router = Router();
//import Leaderboard from '../models/leaderboardModel.js';

import { getLeaderboardEntryById } from "../controllers/leaderboardController.js";
import { createLeaderboardEntry } from "../controllers/leaderboardController.js";
import { deleteLeaderboardEntryById } from "../controllers/leaderboardController.js";
import { updateLeaderboardEntryById } from "../controllers/leaderboardController.js";
import { getAllLeaderboardEntries } from "../controllers/leaderboardController.js";
// GET all leaderboard entries
router.get('/get', getAllLeaderboardEntries);

// GET a leaderboard entry by ID
router.get('/get/:id', getLeaderboardEntryById);

// POST a new leaderboard entry
router.post('/create', createLeaderboardEntry);

// PUT (update) a leaderboard entry by ID
router.put('/update/:id', updateLeaderboardEntryById);

// DELETE a leaderboard entry by ID
router.delete('/delete/:id', deleteLeaderboardEntryById);

export default router;

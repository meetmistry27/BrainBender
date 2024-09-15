import { Request, Response } from 'express';
import Leaderboard from '../models/leaderboardModel.ts';

// Get all leaderboard entries
const getAllLeaderboardEntries = async (req: Request, res: Response): Promise<void> => {
    try {
        const leaderboardEntries = await Leaderboard.find();
        res.json(leaderboardEntries);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Get a leaderboard entry by ID
const getLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const leaderboardEntry = await Leaderboard.findById(req.params.id);
        if (!leaderboardEntry) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json(leaderboardEntry);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new leaderboard entry
const createLeaderboardEntry = async (req: Request, res: Response): Promise<void> => {
    const leaderboardEntry = new Leaderboard({
        quiz_id: req.body.quiz_id,
        user_id: req.body.user_id,
        score: req.body.score,
        rank: req.body.rank
    });

    try {
        const newLeaderboardEntry = await leaderboardEntry.save();
        res.status(201).json(newLeaderboardEntry);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Update a leaderboard entry by ID
const updateLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedLeaderboardEntry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLeaderboardEntry) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json(updatedLeaderboardEntry);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a leaderboard entry by ID
const deleteLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const leaderboardEntry = await Leaderboard.findByIdAndDelete(req.params.id);
        if (!leaderboardEntry) {
            res.status(404).json({ message: 'Leaderboard entry not found' });
            return;
        }
        res.json({ message: 'Leaderboard entry deleted' });
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllLeaderboardEntries,
    getLeaderboardEntryById,
    createLeaderboardEntry,
    updateLeaderboardEntryById,
    deleteLeaderboardEntryById
};

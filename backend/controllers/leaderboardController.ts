// import { Request, Response } from 'express';
// import Leaderboard from '../models/leaderboardModel.ts';

// // Get all leaderboard entries for a specific quiz
// const getAllLeaderboardEntries = async (req: Request, res: Response): Promise<void> => {
//     const { quiz_id } = req.params; // Get the quiz_id from request parameters
//     try {
//         const leaderboardEntries = await Leaderboard.find({ quiz_id }); // Filter by quiz_id
//         res.json(leaderboardEntries);
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Get a leaderboard entry by ID
// const getLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const leaderboardEntry = await Leaderboard.findById(req.params.id);
//         if (!leaderboardEntry) {
//             res.status(404).json({ message: 'Leaderboard entry not found' });
//             return;
//         }
//         res.json(leaderboardEntry);
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Create a new leaderboard entry
// const createLeaderboardEntry = async (req: Request, res: Response): Promise<void> => {
//     const leaderboardEntry = new Leaderboard({
//         quiz_id: req.body.quiz_id,
//         user_id: req.body.user_id,
//         score: req.body.score,
//         rank: req.body.rank
//     });

//     try {
//         const newLeaderboardEntry = await leaderboardEntry.save();
//         res.status(201).json(newLeaderboardEntry);
//     } catch (err: any) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Update a leaderboard entry by ID
// const updateLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const updatedLeaderboardEntry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedLeaderboardEntry) {
//             res.status(404).json({ message: 'Leaderboard entry not found' });
//             return;
//         }
//         res.json(updatedLeaderboardEntry);
//     } catch (err: any) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Delete a leaderboard entry by ID
// const deleteLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const leaderboardEntry = await Leaderboard.findByIdAndDelete(req.params.id);
//         if (!leaderboardEntry) {
//             res.status(404).json({ message: 'Leaderboard entry not found' });
//             return;
//         }
//         res.json({ message: 'Leaderboard entry deleted' });
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export {
//     getAllLeaderboardEntries,
//     getLeaderboardEntryById,
//     createLeaderboardEntry,
//     updateLeaderboardEntryById,
//     deleteLeaderboardEntryById
// };
// import { Request, Response } from 'express';
// import Leaderboard from '../models/leaderboardModel.ts';

// // Get all leaderboard entries for a specific quiz
// const getAllLeaderboardEntries = async (req: Request, res: Response): Promise<void> => {
//     const { quiz_id } = req.params; // Get the quiz_id from request parameters
//     try {
//         const leaderboardEntries = await Leaderboard.find({ quiz_id }).sort({ score: -1 }); // Sort by score descending
//         res.json(leaderboardEntries);
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Get a leaderboard entry by ID
// const getLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const leaderboardEntry = await Leaderboard.findById(req.params.id);
//         if (!leaderboardEntry) {
//             res.status(404).json({ message: 'Leaderboard entry not found' });
//             return;
//         }
//         res.json(leaderboardEntry);
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Get leaderboard entries by user ID and quiz ID
// const getLeaderboardEntriesByUserAndQuiz = async (req: Request, res: Response): Promise<void> => {
//     const { user_id, quiz_id } = req.query; // Extract user_id and quiz_id from query parameters

//     try {
//         // Ensure both parameters are provided
//         if (!user_id || !quiz_id) {
//             res.status(400).json({ message: 'Both user_id and quiz_id are required' });
//             return;
//         }

//         // Query the database for leaderboard entries matching user_id and quiz_id
//         const leaderboardEntries = await Leaderboard.find({ user_id, quiz_id });

//         if (leaderboardEntries.length === 0) {
//             res.status(404).json({ message: 'No leaderboard entries found for the specified user and quiz' });
//             return;
//         }

//         res.json(leaderboardEntries);
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Create or update a leaderboard entry
// const createOrUpdateLeaderboardEntry = async (req: Request, res: Response): Promise<void> => {
//     const { quiz_id, user_id, score } = req.body;

//     try {
//         // Check if the user already has a leaderboard entry for this quiz
//         let leaderboardEntry = await Leaderboard.findOne({ quiz_id, user_id });

//         if (leaderboardEntry) {
//             // Update the entry if it exists
//             leaderboardEntry.score = score; // Update score
//             await leaderboardEntry.save();
//         } else {
//             // Create a new entry
//             leaderboardEntry = new Leaderboard({
//                 quiz_id,
//                 user_id,
//                 score,
//             });
//             await leaderboardEntry.save();
//         }

//         // Recalculate ranks after creating/updating the entry
//         await recalculateRanks(quiz_id);

//         res.status(201).json(leaderboardEntry);
//     } catch (err: any) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Function to recalculate ranks
// const recalculateRanks = async (quiz_id: string): Promise<void> => {
//     const entries = await Leaderboard.find({ quiz_id }).sort({ score: -1 });
//     for (let i = 0; i < entries.length; i++) {
//         entries[i].rank = i + 1; // Set rank based on order
//         await entries[i].save();
//     }
// };

// // Update a leaderboard entry by ID
// const updateLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const updatedLeaderboardEntry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedLeaderboardEntry) {
//             res.status(404).json({ message: 'Leaderboard entry not found' });
//             return;
//         }
//         res.json(updatedLeaderboardEntry);
//     } catch (err: any) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Delete a leaderboard entry by ID
// const deleteLeaderboardEntryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const leaderboardEntry = await Leaderboard.findByIdAndDelete(req.params.id);
//         if (!leaderboardEntry) {
//             res.status(404).json({ message: 'Leaderboard entry not found' });
//             return;
//         }
//         // Recalculate ranks after deletion, convert ObjectId to string
//         await recalculateRanks(leaderboardEntry.quiz_id.toString());
//         res.json({ message: 'Leaderboard entry deleted' });
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export {
//     getLeaderboardEntriesByUserAndQuiz,
//     getAllLeaderboardEntries,
//     getLeaderboardEntryById,
//     createOrUpdateLeaderboardEntry,
//     updateLeaderboardEntryById,
//     deleteLeaderboardEntryById
// };
import { Request, Response } from 'express';
import Leaderboard from '../models/leaderboardModel.ts';

// Get all leaderboard entries for a specific quiz
const getAllLeaderboardEntries = async (req: Request, res: Response): Promise<void> => {
    const { quiz_id } = req.params; // Get quiz_id from request parameters
    try {
        const leaderboardEntries = await Leaderboard.find({ quiz_id }).sort({ score: -1 }); // Sort by score descending
        res.json(leaderboardEntries);
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching leaderboard entries', error: err.message });
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
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching leaderboard entry', error: err.message });
    }
};

// Get leaderboard entries by user ID and quiz ID
const getLeaderboardEntriesByUserAndQuiz = async (req: Request, res: Response): Promise<void> => {
    const { user_id, quiz_id } = req.query; // Extract from query parameters

    try {
        if (!user_id || !quiz_id) {
            res.status(400).json({ message: 'Both user_id and quiz_id are required' });
            return;
        }

        const leaderboardEntries = await Leaderboard.find({ user_id, quiz_id });

        if (leaderboardEntries.length === 0) {
            res.status(404).json({ message: 'No leaderboard entries found for the specified user and quiz' });
            return;
        }

        res.json(leaderboardEntries);
    } catch (err: any) {
        res.status(500).json({ message: 'Error fetching leaderboard entries', error: err.message });
    }
};

// Create or update a leaderboard entry
const createOrUpdateLeaderboardEntry = async (req: Request, res: Response): Promise<void> => {
    const { quiz_id, user_id, score } = req.body;

    try {
        let leaderboardEntry = await Leaderboard.findOne({ quiz_id, user_id });

        if (leaderboardEntry) {
            // Update the existing entry
            leaderboardEntry.score = score;
            await leaderboardEntry.save();
        } else {
            // Create a new entry
            leaderboardEntry = new Leaderboard({
                quiz_id,
                user_id,
                score,
            });
            await leaderboardEntry.save();
        }

        // Recalculate ranks
        await recalculateRanks(quiz_id);

        res.status(201).json(leaderboardEntry);
    } catch (err: any) {
        res.status(400).json({ message: 'Error creating or updating leaderboard entry', error: err.message });
    }
};

// Function to recalculate ranks
const recalculateRanks = async (quiz_id: string): Promise<void> => {
    const entries = await Leaderboard.find({ quiz_id }).sort({ score: -1 });
    for (let i = 0; i < entries.length; i++) {
        entries[i].rank = i + 1; // Set rank based on order
        await entries[i].save();
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
    } catch (err: any) {
        res.status(400).json({ message: 'Error updating leaderboard entry', error: err.message });
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

        await recalculateRanks(leaderboardEntry.quiz_id.toString()); // Recalculate ranks after deletion
        res.json({ message: 'Leaderboard entry deleted' });
    } catch (err: any) {
        res.status(500).json({ message: 'Error deleting leaderboard entry', error: err.message });
    }
};

export {
    getLeaderboardEntriesByUserAndQuiz,
    getAllLeaderboardEntries,
    getLeaderboardEntryById,
    createOrUpdateLeaderboardEntry,
    updateLeaderboardEntryById,
    deleteLeaderboardEntryById
};

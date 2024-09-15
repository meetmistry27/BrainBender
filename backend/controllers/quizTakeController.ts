import { Request, Response } from 'express';
import QuizTake from '../models/quiz_takesModel.ts';

// Get all quiz takes
const getAllQuizTakes = async (req: Request, res: Response): Promise<void> => {
    try {
        const quizTakes = await QuizTake.find();
        res.json(quizTakes);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Get a quiz take by ID
const getQuizTakeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quizTake = await QuizTake.findById(req.params.id);
        if (!quizTake) {
            res.status(404).json({ message: 'Quiz take not found' });
            return;
        }
        res.json(quizTake);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new quiz take
const createQuizTake = async (req: Request, res: Response): Promise<void> => {
    const quizTake = new QuizTake({
        quiz_id: req.body.quiz_id,
        user_id: req.body.user_id,
        score: req.body.score,
        completed_at: req.body.completed_at,
        time_taken: req.body.time_taken
    });

    try {
        const newQuizTake = await quizTake.save();
        res.status(201).json(newQuizTake);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Update a quiz take by ID
const updateQuizTakeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedQuizTake = await QuizTake.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuizTake) {
            res.status(404).json({ message: 'Quiz take not found' });
            return;
        }
        res.json(updatedQuizTake);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a quiz take by ID
const deleteQuizTakeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quizTake = await QuizTake.findByIdAndDelete(req.params.id);
        if (!quizTake) {
            res.status(404).json({ message: 'Quiz take not found' });
            return;
        }
        res.json({ message: 'Quiz take deleted' });
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllQuizTakes,
    getQuizTakeById,
    createQuizTake,
    updateQuizTakeById,
    deleteQuizTakeById
};

import { Request, Response } from 'express';
import Quiz from '../models/quizzesModel.ts';

// Get all quizzes
const getAllQuizzes = async (req: Request, res: Response): Promise<void> => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Get a quiz by ID
const getQuizById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        res.json(quiz);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new quiz
const createQuiz = async (req: Request, res: Response): Promise<void> => {
    const quiz = new Quiz({
        creator_id: req.body.creator_id,
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        questions: req.body.questions
    });

    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Update a quiz by ID
const updateQuizById = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        res.json(updatedQuiz);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a quiz by ID
const deleteQuizById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        res.json({ message: 'Quiz deleted' });
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuizById,
    deleteQuizById
};

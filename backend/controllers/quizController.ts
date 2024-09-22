import { Request, Response } from 'express';
import Quiz from '../models/quizzesModel.ts';
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

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

interface DecodedToken {
    creator_id: string;
}

const createQuiz = async (req: Request, res: Response): Promise<void> => {
    const token = req.body.token;

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

        // Check if the decoded token is an object and has creator_id
        if (typeof decoded === 'object' && 'creator_id' in decoded) {
            const decodedToken = decoded as DecodedToken;

            const quiz = new Quiz({
                title: req.body.title,
                description: req.body.description,
                rating: req.body.rating,
                questions: req.body.questions,
                createdBy: decodedToken.creator_id, // Link to the creator
            });

            const newQuiz = await quiz.save();
            res.status(201).json(newQuiz);
        } else {
            throw new Error('Invalid token structure or creator_id missing');
        }
    } catch (err: any) {
        if (err.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token has expired' });
        } else {
            res.status(400).json({ message: err.message });
        }
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

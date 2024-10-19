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

        // Mock participants and time limit (these could be calculated or set elsewhere)
        const quizzesWithDetails = quizzes.map(quiz => ({
            id: quiz._id,
            title: quiz.title,
            description: quiz.description,
            questionCount: quiz.questions.length, // Calculate the number of questions
            //participants: quiz.participants || 0, // Default or dynamically calculated
            //timeLimit: quiz.time_limit || 15 // Set a default or dynamic time limit if needed
        }));

        res.json(quizzesWithDetails);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};


// Get a quiz by ID
const getQuizById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        //console.log(quiz?.questions[0].options);
        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        res.json(quiz);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Define an interface for the decoded JWT payload

const createQuiz = async (req: Request, res: Response): Promise<Response> => {
    const token = req.body.creator_id;

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as {creator_id: string};

        // Check if the decoded token has creator_id
        if (!decoded) {
            return res.status(400).json({ message: 'Invalid token structure or missing creator_id' });
        }

        // Destructure the quiz data from the request body
        const { title, description, difficulty_level, questions } = req.body;

        // Validate required fields
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({ message: 'Title and questions are required' });
        }

        // Map questions to the required format
        const quizQuestions = questions.map((q: any) => ({
            question_text: q.question_text,
            options: q.options.map((o: any) => ({
                option_text: o.option_text,
                is_correct: o.is_correct,
            })),
        }));

        // Create a new Quiz instance
        const quiz = new Quiz({
            title,
            description,
            difficulty_level,
            questions: quizQuestions,
            creator_id: decoded.creator_id, // Link to the creator
        });

        // Save the quiz to the database
        const newQuiz = await quiz.save();

        // Return the created quiz
        return res.status(201).json(newQuiz);
    } catch (err: any) {
        // Handle errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        } else {
            return res.status(500).json({ message: err.message, error: err.message });
        }
    }
};



export {
    createQuiz,
    getAllQuizzes,
    getQuizById
}

// Update a quiz by ID
// const updateQuizById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedQuiz) {
//             res.status(404).json({ message: 'Quiz not found' });
//             return;
//         }
//         res.json(updatedQuiz);
//     } catch (err:any) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Delete a quiz by ID
// const deleteQuizById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const quiz = await Quiz.findByIdAndDelete(req.params.id);
//         if (!quiz) {
//             res.status(404).json({ message: 'Quiz not found' });
//             return;
//         }
//         res.json({ message: 'Quiz deleted' });
//     } catch (err:any) {
//         res.status(500).json({ message: err.message });
//     }
// };



// export {
//     getAllQuizzes,
//     getQuizById,
//     createQuiz,
//     updateQuizById,
//     deleteQuizById
// };


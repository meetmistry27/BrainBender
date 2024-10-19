import { Request, Response } from 'express';
import QuizTake from '../models/quiz_takesModel.ts';
import Quiz from '../models/quizzesModel.ts';

// Get all quiz takes
const getAllQuizTakes = async (req: Request, res: Response): Promise<void> => {
    try {
        const quizTakes = await QuizTake.find();
        res.json(quizTakes);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

//get a quiz take by id.
const getQuizTakeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const quizTake = await QuizTake.findById(req.params.id)
            .populate('quiz_id')  // Populate quiz details
            .populate('user_id');  // Populate user details

        if (!quizTake) {
            res.status(404).json({ message: 'Quiz take not found' });
            return;
        }
        res.json(quizTake);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// import { Request, Response } from 'express';
// import Quiz from '../models/quizModel'; // Assuming your Quiz model is named like this

// const getQuizTakeById = async (req: Request, res: Response) => {
//   try {
//     const quizId = req.params.id;
//     const quiz = await Quiz.findById(quizId); // MongoDB example
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }
//     res.status(200).json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// Create a new QuizTake entry
// const createQuizTake = async (req: Request, res: Response): Promise<void> => {
//     const { quiz_id, user_id, score, completed_at, time_taken } = req.body;

//     // Log the incoming request body
//     console.log("Received data:", req.body);

//     // Validate the request body
//     if (!quiz_id || !user_id || score === undefined || !completed_at || time_taken === undefined) {
//         res.status(400).json({ message: "All fields (quiz_id, user_id, score, completed_at, time_taken) are required." });
//     }

//     const quizTake = new QuizTake({
//         quiz_id,
//         user_id,
//         score,
//         completed_at,
//         time_taken
//     });

//     try {
//         // Save the new QuizTake entry to the database
//         const newQuizTake = await quizTake.save();
//         res.status(201).json({
//             message: "Quiz result submitted successfully!",
//             quizTake: newQuizTake
//         });
//     } catch (err: any) {
//         console.error("Error saving quiz result:", err);
//         res.status(500).json({
//             message: "Failed to submit quiz result. Please try again later.",
//             error: err.message
//         });
//     }
// };

const createQuizTake = async (req: Request, res: Response): Promise<void> => {
    const { quiz_id, user_id, score, completed_at, time_taken } = req.body;

    console.log("Received data:", req.body);

    if (!quiz_id || !user_id || score === undefined || !completed_at || time_taken === undefined) {
        res.status(400).json({ message: "All fields (quiz_id, user_id, score, completed_at, time_taken) are required." });
        return; // Ensure the function exits after sending the response
    }

    const quizTake = new QuizTake({
        quiz_id,
        user_id,
        score,
        completed_at,
        time_taken
    });

    try {
        const newQuizTake = await quizTake.save();

        // Return the new quizTake with its generated ID (usually `_id` in MongoDB)
        res.status(201).json({
            message: "Quiz result submitted successfully!",
            quizTakeId: newQuizTake._id // Include quizTakeId directly in the response
        });
    } catch (err: any) {
        console.error("Error saving quiz result:", err);
        res.status(500).json({
            message: "Failed to submit quiz result. Please try again later.",
            error: err.message
        });
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

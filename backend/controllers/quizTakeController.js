// const QuizTake = require('../models/quiz_takesModel');
import QuizTake from "../models/quiz_takesModel.js"

// Get all quiz takes
const getAllQuizTakes = async (req, res) => {
    try {
        const quizTakes = await QuizTake.find();
        res.json(quizTakes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a quiz take by ID
const getQuizTakeById = async (req, res) => {
    try {
        const quizTake = await QuizTake.findById(req.params.id);
        if (!quizTake) return res.status(404).json({ message: 'Quiz take not found' });
        res.json(quizTake);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new quiz take
const createQuizTake = async (req, res) => {
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
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a quiz take by ID
const updateQuizTakeById = async (req, res) => {
    try {
        const updatedQuizTake = await QuizTake.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuizTake) return res.status(404).json({ message: 'Quiz take not found' });
        res.json(updatedQuizTake);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a quiz take by ID
const deleteQuizTakeById = async (req, res) => {
    try {
        const quizTake = await QuizTake.findByIdAndDelete(req.params.id);
        if (!quizTake) return res.status(404).json({ message: 'Quiz take not found' });
        res.json({ message: 'Quiz take deleted' });
    } catch (err) {
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

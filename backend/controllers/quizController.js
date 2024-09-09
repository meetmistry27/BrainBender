// const Quiz = require('../models/quizzesModelss');
import Quiz from "../models/quizzesModel.js"

// Get all quizzes
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a quiz by ID
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new quiz
const createQuiz = async (req, res) => {
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
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a quiz by ID
const updateQuizById = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(updatedQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a quiz by ID
const deleteQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json({ message: 'Quiz deleted' });
    } catch (err) {
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

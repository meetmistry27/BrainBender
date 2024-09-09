// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const OptionSchema = new mongoose.Schema({
    // option_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new mongoose.Types.ObjectId(),
    // },
    option_text: {
        type: String,
        required: true,
    },
    is_correct: {
        type: Boolean,
        required: true,
    }
});

const QuestionSchema = new mongoose.Schema({
    // question_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new mongoose.Types.ObjectId(),
    // },
    question_text: {
        type: String,
        required: true,
    },
    question_type: {
        type: String,
        enum: ['MCQ', 'True/False', 'Short Answer'],
        required: true,
    },
    multimedia_url: {
        type: String,
    },
    difficulty_level: {
        type: Number,
        required: true,
    },
    options: [OptionSchema]
});

const QuizSchema = new mongoose.Schema({
    // quiz_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new mongoose.Types.ObjectId(),
    //     index: true,
    // },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
    },
    questions: [QuestionSchema]
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
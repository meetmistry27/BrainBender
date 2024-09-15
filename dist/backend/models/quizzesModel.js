"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const OptionSchema = new mongoose_1.default.Schema({
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
const QuestionSchema = new mongoose_1.default.Schema({
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
const QuizSchema = new mongoose_1.default.Schema({
    // quiz_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new mongoose.Types.ObjectId(),
    //     index: true,
    // },
    creator_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Quiz = mongoose_1.default.model('Quiz', QuizSchema);
exports.default = Quiz;
//# sourceMappingURL=quizzesModel.js.map
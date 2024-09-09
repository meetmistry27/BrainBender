// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const QuizTakeSchema = new mongoose.Schema({
    // quiz_take_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: () => new mongoose.Types.ObjectId(),
    //     index: true,
    // },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    completed_at: {
        type: Date,
        required: true,
    },
    time_taken: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const QuizTake = mongoose.model('QuizTake', QuizTakeSchema);
export default QuizTake;
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const LeaderboardSchema = new mongoose.Schema({
    // leaderboard_id: {
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
    rank: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);
export default Leaderboard;
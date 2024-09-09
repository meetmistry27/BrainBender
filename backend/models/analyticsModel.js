// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
    // analytics_id: {
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
    performance_data: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', AnalyticsSchema);
export default Analytics;
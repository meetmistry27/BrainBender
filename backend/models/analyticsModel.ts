import mongoose, { Document, Model } from 'mongoose';

// Define an interface for the Analytics document
interface IAnalytics extends Document {
    quiz_id: mongoose.Types.ObjectId;  // Reference to Quiz
    user_id: mongoose.Types.ObjectId;  // Reference to User
    performance_data: string;           // Performance data as a string
}

// Define the schema for Analytics
const AnalyticsSchema = new mongoose.Schema<IAnalytics>({
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

// Create the Analytics model
const Analytics: Model<IAnalytics> = mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;

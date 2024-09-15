import mongoose, { Document, Model } from 'mongoose';

// Define an interface for the Leaderboard document
interface ILeaderboard extends Document {
    quiz_id: mongoose.Types.ObjectId;  // Reference to Quiz
    user_id: mongoose.Types.ObjectId;  // Reference to User
    score: number;
    rank: number;
}

// Define the schema for Leaderboard
const LeaderboardSchema = new mongoose.Schema<ILeaderboard>({
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

// Create the Leaderboard model
const Leaderboard: Model<ILeaderboard> = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);

export default Leaderboard;

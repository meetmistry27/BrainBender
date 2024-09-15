import mongoose, { Document, Model } from 'mongoose';

// Define an interface for the QuizTake document
interface IQuizTake extends Document {
    quiz_id: mongoose.Types.ObjectId;  // Reference to Quiz
    user_id: mongoose.Types.ObjectId;  // Reference to User
    score: number;
    completed_at: Date;
    time_taken: number;
}

// Define the schema for QuizTake
const QuizTakeSchema = new mongoose.Schema<IQuizTake>({
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

// Create the QuizTake model
const QuizTake: Model<IQuizTake> = mongoose.model<IQuizTake>('QuizTake', QuizTakeSchema);

export default QuizTake;

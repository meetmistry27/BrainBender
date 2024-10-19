import mongoose, { Document, Model } from 'mongoose';

// Define an interface for Option
interface IOption extends Document {
    option_text: string;
    is_correct: boolean;
}

// Define an interface for Question
interface IQuestion extends Document {
    question_text: string;
    //question_type: 'MCQ' | 'True/False' | 'Short Answer';
    //multimedia_url?: string; // Optional field
    //ifficulty_level: number;
    options: IOption[];
}

// Define an interface for Quiz
interface IQuiz extends Document {
    creator_id: mongoose.Types.ObjectId; // Reference to User
    title: string;
    description?: string; // Optional field
    difficulty_level: 'Easy' | 'Medium' | 'Hard';
        //     type: Number,
        // 
    //rating?: number; // Optional field
    questions: IQuestion[];
}

// Define the Option schema
const OptionSchema = new mongoose.Schema<IOption>({
    option_text: {
        type: String,
        required: true,
    },
    is_correct: {
        type: Boolean,
        required: true,
    }
});

// Define the Question schema
const QuestionSchema = new mongoose.Schema<IQuestion>({
    question_text: {
        type: String,
        required: true,
    },
    // question_type: {
    //     type: String,
    //     enum: ['MCQ', 'True/False', 'Short Answer'],
    //     required: true,
    // },
    // multimedia_url: {
    //     type: String,
    //     required: false,
    // },
    // difficulty_level: {
    //     type: Number,
    //     required: true,
    // },
    options: [OptionSchema]
});

// Define the Quiz schema
const QuizSchema = new mongoose.Schema<IQuiz>({
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
        required: false,
    },
    // rating: {
    //     type: Number,
    //     required: false,
    // },
    difficulty_level: {
           type: String,
           enum: ['Easy','Medium','Hard'],
             required: true,
         },
    questions: [QuestionSchema]
}, { timestamps: true });

// Create the Quiz model
const Quiz: Model<IQuiz> = mongoose.model<IQuiz>('Quiz', QuizSchema);

export default Quiz;

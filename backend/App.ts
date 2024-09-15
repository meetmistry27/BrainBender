import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.ts'; // Ensure you have the correct file extension based on your setup
import quizRoutes from './routes/quizRoutes.ts';
import quizTakeRoutes from './routes/quizTakeRoutes.ts';
import leaderboardRoutes from './routes/leaderboardRoutes.ts';
import analyticsRoutes from './routes/analyticsRoutes.ts';
import { handleErrors } from "./middleware/errorMiddleware.ts";
import cors from 'cors';

// Create an instance of the express application
const app = express();

app.use(cors({
    origin: 'http://localhost:3000' // or the URL of your frontend
}));
// Middleware to parse JSON
app.use(express.json());

// Route middleware
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);
app.use('/quiz-takes', quizTakeRoutes);
app.use('/leaderboards', leaderboardRoutes);
app.use('/analytics', analyticsRoutes);

// Error handling middleware
app.use(handleErrors);

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://22ceubs085:VBbFNPFPBEkwv3TC@quiz.7n4yosf.mongodb.net', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
    .catch(err => console.error(err));

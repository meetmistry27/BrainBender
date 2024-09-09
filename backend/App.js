// const express = require("express");
import express from "express";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const cors = require("cors");
const app = express();

// Import routes
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import quizTakeRoutes from './routes/quizTakeRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Middleware
app.use(express.json());

// Routes middleware
app.use('/users', userRoutes);
app.use('/quizzes', quizRoutes);
app.use('/quiz-takes', quizTakeRoutes);
app.use('/leaderboards', leaderboardRoutes);
app.use('/analytics', analyticsRoutes);

//router.post('/createuser',createUser);


// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://22ceubs085:VBbFNPFPBEkwv3TC@quiz.7n4yosf.mongodb.net', {  })
    .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
    .catch(err => console.error(err));

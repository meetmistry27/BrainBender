import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage.tsx';
import LeaderboardPage from './components/leaderboard.tsx';
import QuizzesPage from './components/quizzes.tsx'; // Ensure QuizzesPage is imported correctly
import AnalyticsPage from './components/analytics.tsx';
import ProfilePage from './components/profile.tsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/quizzes/leaderboard/:quizId?" element={<LeaderboardPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;

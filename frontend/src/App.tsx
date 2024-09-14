import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage.tsx';
// import LoginPage from './components/LoginPage'; // Assume you have these components
// import SignupPage from './components/SignupPage'; // Assume you have these components
// import QuizzesPage from './components/QuizzesPage'; // Assume you have these components
// import LeaderboardPage from './components/LeaderboardPage'; // Assume you have these components
// import ProfilePage from './components/ProfilePage'; // Assume you have these components
// import NotFoundPage from './components/NotFoundPage'; // Page for 404 Not Found

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
        </Router>
    );
};

export default App;

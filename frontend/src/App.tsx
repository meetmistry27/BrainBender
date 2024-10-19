import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage.tsx';
import LeaderboardPage from './components/leaderboard.tsx';
import QuizzesPage from './components/quizzes.tsx'; // Ensure QuizzesPage is imported correctly
import AnalyticsPage from './components/analytics.tsx';
import ProfilePage from './components/profile.tsx';
import { LoginSignupPage } from './components/auth.tsx';
import CreateQuizPage from './components/create_quiz.tsx';
import Logout from './components/logout.tsx';
import TakeQuizPage from './components/take-quiz.tsx';
import QuizResultPage from './components/quiz_results.tsx';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/quizzes/leaderboard/:quizId?" element={<LeaderboardPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path = '/auth' element ={<LoginSignupPage/>} />  
                <Route path = '/create_quiz' element ={<CreateQuizPage/>} />
                <Route path = '/logout' element = { <Logout/> } />
                <Route path = '/takequiz/:quizId?' element = { <TakeQuizPage/> } />
                <Route path = '/quiz-results/:quizTakeId?' element = { <QuizResultPage/> } />
            </Routes>
        </Router>
    );
};

export default App;

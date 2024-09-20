import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { BookOpen, Trophy, BarChart2, PenTool, Menu, X } from 'lucide-react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Profile', path: '/profile' },
    { name: 'Login', path: '/auth'},
    { name: 'Logout', path:'/logout'}
  ];
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate('/create_quiz');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <motion.div
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          QuizMaster
        </motion.div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to ={item.path} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <header className="home-header">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to QuizMaster
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Challenge Your Mind, Expand Your Knowledge
        </motion.p>
      </header>

      <main className="home-main">
        <section className="quiz-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready for a Challenge?
          </motion.h2>
          <div className="quiz-buttons">
            <Button variant="default" size="lg" className="create-quiz-btn" onClick={handleCreateQuiz}>
              Create Quiz
            </Button>
            <Button variant="secondary" size="lg" className="take-quiz-btn">
              Take Quiz
            </Button>
          </div>
        </section>

        <section className="features-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose QuizMaster?
          </motion.h2>
          <div className="features-grid">
            {[
              { icon: <BookOpen className="feature-icon" />, title: 'Diverse Topics', description: 'Explore a wide range of subjects' },
              { icon: <Trophy className="feature-icon" />, title: 'Compete', description: 'Challenge friends and climb the leaderboard' },
              { icon: <BarChart2 className="feature-icon" />, title: 'Track Progress', description: 'Monitor your improvement with detailed analytics' },
              { icon: <PenTool className="feature-icon" />, title: 'Create Quizzes', description: 'Design your own quizzes and share with others' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2023 QuizMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}

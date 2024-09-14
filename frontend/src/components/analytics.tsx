import React from 'react'
import { motion } from 'framer-motion'
import { Link, Routes, Route } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Award, Brain, Clock, Target, TrendingUp } from 'lucide-react'
//import './homepage.css';

interface QuizAttempt {
  id: string
  title: string
  date: string
  score: number
  totalQuestions: number
  timeSpent: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const mockQuizAttempts: QuizAttempt[] = [
  { id: '1', title: 'General Knowledge', date: '2023-06-01', score: 18, totalQuestions: 20, timeSpent: 15, difficulty: 'Easy' },
  { id: '2', title: 'Science Quiz', date: '2023-06-05', score: 22, totalQuestions: 25, timeSpent: 20, difficulty: 'Medium' },
  { id: '3', title: 'History Trivia', date: '2023-06-10', score: 27, totalQuestions: 30, timeSpent: 25, difficulty: 'Hard' },
  { id: '4', title: 'Pop Culture', date: '2023-06-15', score: 13, totalQuestions: 15, timeSpent: 12, difficulty: 'Easy' },
  { id: '5', title: 'Technology Test', date: '2023-06-20', score: 19, totalQuestions: 22, timeSpent: 18, difficulty: 'Medium' },
]

const performanceData = [
  { name: 'General Knowledge', correct: 18, incorrect: 2 },
  { name: 'Science Quiz', correct: 22, incorrect: 3 },
  { name: 'History Trivia', correct: 27, incorrect: 3 },
  { name: 'Pop Culture', correct: 13, incorrect: 2 },
  { name: 'Technology Test', correct: 19, incorrect: 3 },
]

const difficultyPerformanceData = [
  { name: 'Easy', value: 31, fill: '#4ade80' },
  { name: 'Medium', value: 41, fill: '#facc15' },
  { name: 'Hard', value: 27, fill: '#f87171' },
]

export default function AnalyticsContent() {
  const totalQuizzes = mockQuizAttempts.length
  const totalQuestions = mockQuizAttempts.reduce((sum, quiz) => sum + quiz.totalQuestions, 0)
  const totalCorrect = mockQuizAttempts.reduce((sum, quiz) => sum + quiz.score, 0)
  const averageScore = totalCorrect / totalQuizzes
  const totalTimeSpent = mockQuizAttempts.reduce((sum, quiz) => sum + quiz.timeSpent, 0)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <nav className="mb-8">
          <ul className="flex space-x-4 justify-center">
            {['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    item === 'Analytics' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Quiz Analytics
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes Taken</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuizzes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions Answered</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuestions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTimeSpent} minutes</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="correct" fill="#4ade80" name="Correct Answers" />
                    <Bar dataKey="incorrect" fill="#f87171" name="Incorrect Answers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance by Difficulty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {difficultyPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quiz Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {mockQuizAttempts.map((quiz) => (
                <div key={quiz.id} className="flex items-center">
                  <Award className="h-9 w-9 text-primary" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{quiz.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {quiz.date} | Time Spent: {quiz.timeSpent} minutes | Difficulty: {quiz.difficulty}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    Score: {quiz.score}/{quiz.totalQuestions}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



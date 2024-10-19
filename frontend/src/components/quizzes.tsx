  import React, { useEffect, useState } from 'react'
  import { motion } from 'framer-motion'
  import { Link } from 'react-router-dom'
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card.tsx"
  import { Button } from "./ui/button.tsx"
  import { Input } from "./ui/input.tsx"
  import { Trophy, Search, BookOpen, Clock, Users } from 'lucide-react'
  import axios from 'axios'
  
  interface Quiz {
    id: string
    title: string
    description: string
    questionCount: number
    timeLimit: number
    participants: number
  }
  
  export default function QuizzesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      // Fetch quizzes from the backend
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get('http://localhost:5000/quizzes/get') // Adjust the URL based on your API endpoint
          setQuizzes(response.data)
        } catch (err) {
          setError('Failed to fetch quizzes: ' + err);
        } finally {
          setLoading(false)
        }
      }
  
      fetchQuizzes()
    }, [])
  
    const filteredQuizzes = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    if (loading) return <p>Loading quizzes...</p>
    if (error) return <p>{error}</p>
  
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
                      item === 'Quizzes' ? 'text-primary' : 'text-muted-foreground'
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
            Explore Quizzes
          </motion.h1>
  
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search quizzes..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-lg">
                  <CardHeader className="bg-gray-200 p-4 rounded-t-lg">
                    <CardTitle className="text-xl font-bold text-gray-800">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <p className="text-gray-600 mb-2">{quiz.description}</p>
                    <div className="border-t border-gray-300 mt-2 pt-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex flex-col items-start mr-4">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="font-medium text-gray-800">{quiz.questionCount}</span>
                          </div>
                          <span className="text-gray-500">questions</span>
                        </div>
                        <div className="flex flex-col items-start mr-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="font-medium text-gray-800">{quiz.timeLimit}</span> {/* Updated to use quiz.timeLimit */}
                          </div>
                          <span className="text-gray-500">minutes</span>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="font-medium text-gray-800">{quiz.participants}</span> {/* Updated to use quiz.participants */}
                          </div>
                          <span className="text-gray-500">participants</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4">
                    <Link to={`/takequiz/${quiz.id}`}> {/* Pass quiz ID in the URL */}
                      <Button variant="outline" className="flex-1 mr-2">Start Quiz</Button>
                    </Link>
                    <Link to={`/quizzes/leaderboard/${quiz.id}`}>
                      <Button variant="secondary" className="flex-1">
                        <Trophy className="w-4 h-4 mr-2" />
                        Leaderboard
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

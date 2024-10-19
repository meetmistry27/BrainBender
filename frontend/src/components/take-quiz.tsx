import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { Button } from "../components/ui/button.tsx"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.tsx"
import { Label } from "../components/ui/label.tsx"
import { Progress } from "../components/ui/progress.tsx"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog.tsx"
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert.tsx"

interface Option {
  id: string
  option_text: string
  is_correct: boolean
}

interface Question {
  id: string
  question_text: string
  options: Option[]
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
}

const API_BASE_URL = 'http://localhost:5000'

const fetchQuizAPI = async (quizId: string): Promise<Quiz> => {
  const response = await fetch(`${API_BASE_URL}/quizzes/get/${quizId}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  return data as Quiz
}

export default function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) {
        setError('No quiz ID provided')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const quizData = await fetchQuizAPI(quizId)
        setQuiz(quizData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuiz()
  }, [quizId])

  const handleAnswerChange = (value: string) => {
    if (!quiz) return
    setAnswers(prev => ({ ...prev, [quiz.questions[currentQuestionIndex].id]: value }))
  }

  const goToNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const calculateScore = (): number => {
    if (!quiz) return 0
    let score = 0
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id]
      const correctAnswer = question.options.find((opt) => opt.is_correct)?.id
      if (userAnswer === correctAnswer) score++
    })
    return score
  }

  const userId = localStorage.getItem('userId')

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/quiz-takes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_id: quizId,
          user_id: userId,  // Get userId from localStorage or other sources
          score: calculateScore(),
          completed_at: new Date(),
          time_taken: 120, // Replace with actual time tracking
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit quiz take')
      }

      const result = await response.json()
      console.log('QuizTake Response:', result) // Log the full response to check structure

      // Ensure quizTake._id exists in the response
      if (!result.quizTake || !result.quizTake._id) {
        throw new Error('quizTakeId not found in the response')
      }

      // Navigate to the quiz-results page with quizTakeId in the URL
      navigate(`/quiz-results/${result.quizTake._id}`, { state: { answers, quizId } })
    } catch (err: any) {
      console.error('Error submitting quiz take:', err)
      setError(`Failed to submit quiz take: ${err.message}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Quiz Not Found</AlertTitle>
          <AlertDescription>The requested quiz could not be found. Please try again later.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-6 text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {quiz.title}
        </motion.h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span className="text-sm font-normal text-muted-foreground">
                Progress: {Math.round(progress)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-4" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">{currentQuestion.question_text}</h2>
                <RadioGroup
                  value={answers[currentQuestion.id] || ''}
                  onValueChange={handleAnswerChange}
                  className="space-y-2"
                >
                  {currentQuestion.options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.option_text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button variant="ghost" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <AlertDialogTrigger asChild>
                  <Button onClick={() => setShowSubmitDialog(true)}>
                    Submit Quiz <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button onClick={goToNextQuestion}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

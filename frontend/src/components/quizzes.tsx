  // import React from 'react'
  // import { motion } from 'framer-motion'
  // import { Link } from 'react-router-dom'
  // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card.tsx"
  // import { Button } from "./ui/button.tsx"
  // import { Input } from "./ui/input.tsx"
  // import { Trophy, Search, BookOpen, Clock, Users } from 'lucide-react'

  // interface Quiz {
  //   id: string
  //   title: string
  //   description: string
  //   questionCount: number
  //   timeLimit: number
  //   participants: number
  // }

  // const mockQuizzes: Quiz[] = [
  //   {
  //     id: '1',
  //     title: 'General Knowledge Master',
  //     description: 'Test your knowledge on a variety of topics!',
  //     questionCount: 20,
  //     timeLimit: 15,
  //     participants: 1500
  //   },
  //   {
  //     id: '2',
  //     title: 'Science Spectacular',
  //     description: 'Explore the wonders of science with this challenging quiz!',
  //     questionCount: 25,
  //     timeLimit: 20,
  //     participants: 1200
  //   },
  //   {
  //     id: '3',
  //     title: 'History Buff',
  //     description: 'Journey through time with this history-focused quiz!',
  //     questionCount: 30,
  //     timeLimit: 25,
  //     participants: 1000
  //   },
  //   {
  //     id: '4',
  //     title: 'Pop Culture Guru',
  //     description: 'How well do you know movies, music, and celebrities?',
  //     questionCount: 15,
  //     timeLimit: 10,
  //     participants: 2000
  //   },
  //   {
  //     id: '5',
  //     title: 'Tech Wizard',
  //     description: 'Put your technology knowledge to the test!',
  //     questionCount: 22,
  //     timeLimit: 18,
  //     participants: 800
  //   },
  //   {
  //     id: '6',
  //     title: 'Sports Fanatic',
  //     description: 'From football to cricket, test your sports knowledge!',
  //     questionCount: 25,
  //     timeLimit: 20,
  //     participants: 1800
  //   }
  // ]

  // export default function QuizzesPage() {
  //   const [searchTerm, setSearchTerm] = React.useState('')

  //   const filteredQuizzes = mockQuizzes.filter(quiz =>
  //     quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   )

  //   return (
  //     <div className="min-h-screen bg-gray-100 p-6">
  //       <div className="max-w-6xl mx-auto">
  //         <nav className="mb-8">
  //           <ul className="flex space-x-4 justify-center">
  //             {['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (
  //               <li key={item}>
  //                 <Link
  //                   to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
  //                   className={`text-sm font-medium transition-colors hover:text-primary ${
  //                     item === 'Quizzes' ? 'text-primary' : 'text-muted-foreground'
  //                   }`}
  //                 >
  //                   {item}
  //                 </Link>
  //               </li>
  //             ))}
  //           </ul>
  //         </nav>

  //         <motion.h1
  //           className="text-4xl font-bold mb-8 text-center text-primary"
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           Explore Quizzes
  //         </motion.h1>

  //         <div className="mb-8 relative">
  //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  //           <Input
  //             type="text"
  //             placeholder="Search quizzes..."
  //             className="pl-10 pr-4 py-2 w-full"
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //           />
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //           {filteredQuizzes.map((quiz) => (
  //             <motion.div
  //               key={quiz.id}
  //               initial={{ opacity: 0, scale: 0.9 }}
  //               animate={{ opacity: 1, scale: 1 }}
  //               transition={{ duration: 0.3 }}
  //             >
  //               <Card className="h-full flex flex-col transition-shadow duration-300 hover:shadow-lg">
  //                 <CardHeader className="bg-gray-200 p-4 rounded-t-lg">
  //                   <CardTitle className="text-xl font-bold text-gray-800">{quiz.title}</CardTitle>
  //                 </CardHeader>
  //                 <CardContent className="flex-grow p-4">
  //                   <p className="text-gray-600 mb-2">{quiz.description}</p>
  //                   <div className="border-t border-gray-300 mt-2 pt-2">
  //                     <div className="flex justify-between text-sm">
  //                       <div className="flex flex-col items-start mr-4">
  //                         <div className="flex items-center">
  //                           <BookOpen className="w-4 h-4 mr-1 text-gray-400" />
  //                           <span className="font-medium text-gray-800">{quiz.questionCount}</span>
  //                         </div>
  //                         <span className="text-gray-500">questions</span>
  //                       </div>
  //                       <div className="flex flex-col items-start mr-4">
  //                         <div className="flex items-center">
  //                           <Clock className="w-4 h-4 mr-1 text-gray-400" />
  //                           <span className="font-medium text-gray-800">{quiz.timeLimit}</span>
  //                         </div>
  //                         <span className="text-gray-500">minutes</span>
  //                       </div>
  //                       <div className="flex flex-col items-start">
  //                         <div className="flex items-center">
  //                           <Users className="w-4 h-4 mr-1 text-gray-400" />
  //                           <span className="font-medium text-gray-800">{quiz.participants}</span>
  //                         </div>
  //                         <span className="text-gray-500">participants</span>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </CardContent>
  //                 <CardFooter className="flex justify-between p-4">
  //                   <Button variant="outline" className="flex-1 mr-2">Start Quiz</Button>
  //                   <Link to={`/quizzes/leaderboard/${quiz.id}`}>
  //                     <Button variant="secondary" className="flex-1">
  //                       <Trophy className="w-4 h-4 mr-2" />
  //                       Leaderboard
  //                     </Button>
  //                   </Link>
  //                 </CardFooter>
  //               </Card>
  //             </motion.div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }





















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
  



  
  // import React, { useState, useEffect } from 'react';
  // import { motion, AnimatePresence } from 'framer-motion';
  // import { useParams, useNavigate } from 'react-router-dom';
  // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
  // import { Button } from "../components/ui/button.tsx";
  // import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.tsx";
  // import { Label } from "../components/ui/label.tsx";
  // import { Progress } from "../components/ui/progress.tsx";
  // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog.tsx";
  // import { ChevronLeft, ChevronRight, AlertTriangle, AlertCircle } from 'lucide-react';
  // import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert.tsx";
  
  // // Interface definitions remain the same
  // interface Question {
  //   id: string;
  //   text: string;
  //   options: { id: string; text: string }[];
  // }
  
  // interface Quiz {
  //   id: string;
  //   title: string;
  //   description: string;
  //   questions: Question[];
  // }
  
  // export default function TakeQuizPage() {
  //   const { quizId } = useParams<{ quizId: string }>();  // Assuming you're passing quizId in the URL
  //   const navigate = useNavigate();
  //   const [quiz, setQuiz] = useState<Quiz | null>(null);
  //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   const [answers, setAnswers] = useState<Record<string, string>>({});
  //   const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  //   const [error, setError] = useState<string | null>(null);
  //   const [isLoading, setIsLoading] = useState(true);
  
  //   useEffect(() => {
  //     const fetchQuiz = async () => {
  //       try {
  //         setIsLoading(true);
  //         const response = await fetch(`/api/quizzes/${quizId}`); // Fetch quiz data from your backend API
  //         if (!response.ok) {
  //           throw new Error('Quiz not found');
  //         }
  //         const data = await response.json();
  //         setQuiz(data);  // Set the fetched quiz data to state
  //       } catch (err: any) {
  //         setError(err.message || 'An unexpected error occurred');
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  
  //     if (quizId) {
  //       fetchQuiz(); // Fetch quiz if quizId is present
  //     }
  //   }, [quizId]);
  
  //   // Remaining logic for handling quiz remains the same...
  //   const handleAnswerChange = (value: string) => {
  //     if (!quiz) return;
  //     setAnswers(prev => ({ ...prev, [quiz.questions[currentQuestionIndex].id]: value }));
  //   };
  
  //   const goToNextQuestion = () => {
  //     if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
  //       setCurrentQuestionIndex(prev => prev + 1);
  //     }
  //   };
  
  //   const goToPreviousQuestion = () => {
  //     if (currentQuestionIndex > 0) {
  //       setCurrentQuestionIndex(prev => prev - 1);
  //     }
  //   };
  
  //   const handleSubmit = () => {
  //     try {
  //       console.log('Submitted answers:', answers);
  //       navigate('/quiz-results');
  //     } catch (err) {
  //       setError('Failed to submit quiz. Please try again.');
  //     }
  //   };
  
  //   if (isLoading) {
  //     return (
  //       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
  //           <p className="mt-4 text-lg">Loading quiz...</p>
  //         </div>
  //       </div>
  //     );
  //   }
  
  //   if (error) {
  //     return (
  //       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  //         <Alert variant="destructive" className="max-w-md w-full">
  //           <AlertCircle className="h-4 w-4" />
  //           <AlertTitle>Error</AlertTitle>
  //           <AlertDescription>{error}</AlertDescription>
  //         </Alert>
  //       </div>
  //     );
  //   }
  
  //   if (!quiz) {
  //     return (
  //       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  //         <Alert variant="destructive" className="max-w-md w-full">
  //           <AlertCircle className="h-4 w-4" />
  //           <AlertTitle>Quiz Not Found</AlertTitle>
  //           <AlertDescription>The requested quiz could not be found. Please try again later.</AlertDescription>
  //         </Alert>
  //       </div>
  //     );
  //   }
  
  //   const currentQuestion = quiz.questions[currentQuestionIndex];
  //   const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  //   return (
  //     <div className="min-h-screen bg-gray-100 p-6">
  //       <div className="max-w-3xl mx-auto">
  //         <motion.h1
  //           className="text-3xl font-bold mb-6 text-center text-primary"
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //         >
  //           {quiz.title}
  //         </motion.h1>
  
  //         <Card>
  //           <CardHeader>
  //             <CardTitle className="flex justify-between items-center">
  //               <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
  //               <span className="text-sm font-normal text-muted-foreground">
  //                 Progress: {Math.round(progress)}%
  //               </span>
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <Progress value={progress} className="mb-4" />
  //             <AnimatePresence mode="wait">
  //               <motion.div
  //                 key={currentQuestion.id}
  //                 initial={{ opacity: 0, x: 20 }}
  //                 animate={{ opacity: 1, x: 0 }}
  //                 exit={{ opacity: 0, x: -20 }}
  //                 transition={{ duration: 0.3 }}
  //               >
  //                 <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
  //                 <RadioGroup
  //                   value={answers[currentQuestion.id] || ''}
  //                   onValueChange={handleAnswerChange}
  //                   className="space-y-2"
  //                 >
  //                   {currentQuestion.options.map(option => (
  //                     <div key={option.id} className="flex items-center space-x-2">
  //                       <RadioGroupItem value={option.id} id={`option-${option.id}`} />
  //                       <Label htmlFor={`option-${option.id}`}>{option.text}</Label>
  //                     </div>
  //                   ))}
  //                 </RadioGroup>
  //               </motion.div>
  //             </AnimatePresence>
  //           </CardContent>
  //           <CardFooter className="flex justify-between">
  //             <Button
  //               onClick={goToPreviousQuestion}
  //               disabled={currentQuestionIndex === 0}
  //               variant="outline"
  //             >
  //               <ChevronLeft className="mr-2 h-4 w-4" /> Previous
  //             </Button>
  //             {currentQuestionIndex === quiz.questions.length - 1 ? (
  //               <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
  //                 <AlertDialogTrigger asChild>
  //                   <Button>Submit Quiz</Button>
  //                 </AlertDialogTrigger>
  //                 <AlertDialogContent>
  //                   <AlertDialogHeader>
  //                     <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
  //                     <AlertDialogDescription>
  //                       You've answered {Object.keys(answers).length} out of {quiz.questions.length} questions.
  //                       {Object.keys(answers).length < quiz.questions.length && (
  //                         <div className="flex items-center mt-2 text-yellow-600">
  //                           <AlertTriangle className="mr-2 h-4 w-4" />
  //                           You have unanswered questions.
  //                         </div>
  //                       )}
  //                     </AlertDialogDescription>
  //                   </AlertDialogHeader>
  //                   <AlertDialogFooter>
  //                     <AlertDialogCancel>Cancel</AlertDialogCancel>
  //                     <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
  //                   </AlertDialogFooter>
  //                 </AlertDialogContent>
  //               </AlertDialog>
  //             ) : (
  //               <Button onClick={goToNextQuestion}>
  //                 Next <ChevronRight className="ml-2 h-4 w-4" />
  //               </Button>
  //             )}
  //           </CardFooter>
  //         </Card>
  //       </div>
  //     </div>
  //   );
  // }
  

















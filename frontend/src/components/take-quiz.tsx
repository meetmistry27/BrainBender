import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Button } from "../components/ui/button.tsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.tsx";
import { Label } from "../components/ui/label.tsx";
import { Progress } from "../components/ui/progress.tsx";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog.tsx";
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert.tsx";

interface Option {
  _id: string;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  _id: string;
  question_text: string;
  options: Option[];
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

const API_BASE_URL = 'http://localhost:5000';

const fetchQuizAPI = async (quizId: string): Promise<Quiz> => {
  const response = await fetch(`${API_BASE_URL}/quizzes/get/${quizId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data as Quiz;
}

export default function TakeQuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) {
        setError('No quiz ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const quizData = await fetchQuizAPI(quizId);
        setQuiz(quizData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    loadQuiz();
  }, [quizId]);

  const handleAnswerChange = (selectedOptionId: string) => {
    console.log("the selected option is" + selectedOptionId)
    if (!quiz) return;
    setAnswers((prev) => ({
      ...prev,
      [quiz.questions[currentQuestionIndex]._id]: selectedOptionId, // Update answer for the current question
    }));
  };
  

  const goToNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }

  const calculateScore = (): number => {
    if (!quiz) return 0;
    let score = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question._id];
      
      //console.log(userAnswer);
      const correctAnswer = question.options.find((opt) => opt.is_correct)?._id;
      if(userAnswer===undefined)
        {
          return ;
        }
      //console.log(correctAnswer)
      if (userAnswer === correctAnswer) {score++};
    });
    return score;
  }

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
      const response = await fetch(`${API_BASE_URL}/quiz-takes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_id: quizId,
          user_id: userId,
          score: calculateScore(),
          completed_at: new Date(),
          time_taken: 120, // Replace with actual time tracking
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit quiz take');
      }

      const result = await response.json();
      console.log('QuizTake Response:', result);

      if (!result.quizTakeId) {
        throw new Error('quizTakeId not found in the response');
      }

      navigate(`/quiz-results/${result.quizTakeId}`, { state: { answers, quizId } });
    } catch (err: any) {
      console.error('Error submitting quiz take:', err);
      setError(`Failed to submit quiz take: ${err.message}`);
    }
  }
  
  //leaderboard not happening please help 
  // const handleSubmit = async () => {
  //   try {
  //     const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
  //     const score = calculateScore(); // Calculate score based on user answers
  //     console.log(score)
  //     // Submit quiz results
  //     const response = await fetch(`${API_BASE_URL}/quiz-takes/create`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         quiz_id: quizId,
  //         user_id: userId,
  //         score: score,
  //         completed_at: new Date(),
  //         time_taken: 120, // Replace with actual time tracking
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to submit quiz take');
  //     }
  
  //     const result = await response.json();
  //     console.log('QuizTake Response:', result);
  
  //     if (!result.quizTakeId) {
  //       throw new Error('quizTakeId not found in the response');
  //     }
  
  //     // Check if the user already has an entry in the leaderboard
  //     const leaderboardResponse = await fetch(`${API_BASE_URL}/leaderboards/entries?user_id=${userId}&quiz_id=${quizId}`);
  //     const leaderboardEntries = await leaderboardResponse.json();
  
  //     if (leaderboardEntries.length === 0) {
  //       // Create leaderboard entry since it doesn't exist
  //       const leaderboardEntry = {
  //         quiz_id: quizId,
  //         user_id: userId,
  //         score: score,
  //       };
  
  //       const createLeaderboardResponse = await fetch(`${API_BASE_URL}/leaderboards/create`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(leaderboardEntry),
  //       });
  
  //       if (!createLeaderboardResponse.ok) {
  //         const errorData = await createLeaderboardResponse.json();
  //         throw new Error(errorData.message || 'Failed to create leaderboard entry');
  //       }
  //     } else {
  //       // Update existing leaderboard entry if needed
  //       const existingEntry = leaderboardEntries[0];
  //       console.log(existingEntry)
  //       if (existingEntry.score < score) {
  //         // Update the entry if the new score is higher
  //         const updateLeaderboardResponse = await fetch(`${API_BASE_URL}/leaderboards/update/${existingEntry._id}`, {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ score: score }),
  //         });
  
  //         if (!updateLeaderboardResponse.ok) {
  //           const errorData = await updateLeaderboardResponse.json();
  //           throw new Error(errorData.message || 'Failed to update leaderboard entry');
  //         }
  //       }
  //     }
  
  //     // Redirect to quiz results page with the quizTakeId
  //     navigate(`/quiz-results/${result.quizTakeId}`, { state: { answers, quizId } });
  //   } catch (err: any) {
  //     console.error('Error submitting quiz take:', err);
  //     setError(`Failed to submit quiz take: ${err.message}`);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading quiz...</p>
        </div>
      </div>
    );
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
    );
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
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

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

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-xl">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <span className="text-sm font-normal text-muted-foreground">
                Progress: {Math.round(progress)}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-6 h-2" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">{currentQuestion.question_text}</h2>
                <RadioGroup
  value={answers[currentQuestion._id] || ''} // Bind the current answer to the value
  onValueChange={(value) => handleAnswerChange(value)} // Handle value change event
  className="space-y-4"
>
  {currentQuestion.options.map((option) => (
    <div
      key={option._id}
      className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100"
      
      onClick={() => {
        console.log("Option selected before:", option._id); // Debug: Log selected option
        handleAnswerChange(option._id); // Pass correct option ID to handler
        console.log("option selected after", option._id)
      }} // Change answer on click
    >
      <RadioGroupItem
        value={option._id} // Ensure the value matches the option ID
        id={option._id}
        className={`w-6 h-6 border-2 border-primary text-primary focus:ring-2 focus:ring-primary ${
          answers[currentQuestion._id] === option._id ? 'bg-primary' : ''
        }`}
      />
      <Label htmlFor={option._id} className="flex-grow text-lg cursor-pointer">
        {option.option_text}
      </Label>
    </div>
  ))}
</RadioGroup>

              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button onClick={() => setShowSubmitDialog(true)}>Submit Quiz</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Submit Quiz</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to submit your quiz? You will not be able to change your answers after this.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setShowSubmitDialog(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { handleSubmit(); setShowSubmitDialog(false); }}>Submit</AlertDialogAction>
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
  );
}
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx";
// import { Button } from "../components/ui/button.tsx";
// import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.tsx";
// import { Label } from "../components/ui/label.tsx";
// import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert.tsx";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription} from "../components/ui/alert-dialog.tsx";
// import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

// interface Option {
//   _id: string;
//   option_text: string;
//   is_correct: boolean;
// }

// interface Question {
//   _id: string;
//   question_text: string;
//   options: Option[];
// }

// interface Quiz {
//   _id: string;
//   title: string;
//   description: string;
//   questions: Question[];
// }

// const API_BASE_URL = 'http://localhost:5000';

// const fetchQuizAPI = async (quizId: string): Promise<Quiz> => {
//   const response = await fetch(`${API_BASE_URL}/quizzes/get/${quizId}`);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   const data = await response.json();
//   return data as Quiz;
// }

// export default function TakeQuizPage() {
//   const { quizId } = useParams<{ quizId: string }>();
//   const navigate = useNavigate();
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [showSubmitDialog, setShowSubmitDialog] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadQuiz = async () => {
//       if (!quizId) {
//         setError('No quiz ID provided');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         const quizData = await fetchQuizAPI(quizId);
//         setQuiz(quizData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unexpected error occurred');
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadQuiz();
//   }, [quizId]);

//   const handleAnswerChange = (selectedOptionId: string) => {
//     if (!quiz) return;
//     setAnswers((prev) => ({
//       ...prev,
//       [quiz.questions[currentQuestionIndex]._id]: selectedOptionId, // Update answer for the current question
//     }));
//   };

//   const goToNextQuestion = () => {
//     if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   }

//   const goToPreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   }

//   const calculateScore = (): number => {
//     if (!quiz) return 0;
//     let score = 0;
//     quiz.questions.forEach((question) => {
//       const userAnswer = answers[question._id];
//       const correctAnswer = question.options.find((opt) => opt.is_correct)?._id;

//       // Increment score only if the answer is correct
//       if (userAnswer && userAnswer === correctAnswer) {
//         score++;
//       }
//     });
//     return score;
//   }

//   const handleSubmit = async () => {
//     try {
//       const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
//       const score = calculateScore(); // Calculate score based on user answers

//       // Submit quiz results
//       const response = await fetch(`${API_BASE_URL}/quiz-takes/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           quiz_id: quizId,
//           user_id: userId,
//           score: score,
//           completed_at: new Date(),
//           time_taken: 120, // Replace with actual time tracking
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to submit quiz take');
//       }

//       const result = await response.json();
//       console.log('QuizTake Response:', result);

//       if (!result.quizTakeId) {
//         throw new Error('quizTakeId not found in the response');
//       }

//       // Directly create a new leaderboard entry without checking for existing ones
//       const leaderboardEntry = {
//         quiz_id: quizId,
//         user_id: userId,
//         score: score,
//       };

//       const createLeaderboardResponse = await fetch(`${API_BASE_URL}/leaderboards/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(leaderboardEntry),
//       });

//       if (!createLeaderboardResponse.ok) {
//         const errorData = await createLeaderboardResponse.json();
//         throw new Error(errorData.message);
//       }

//       // Redirect to quiz results page with the quizTakeId
//       navigate(`/quiz-results/${result.quizTakeId}`, { state: { answers, quizId } });
//     } catch (err: any) {
//       console.error('Error submitting quiz take:', err);
//       setError(`Failed to submit quiz take: ${err.message}`);
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

//         <Card className="shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex justify-between items-center">
//               <span className="text-xl">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
//               <span className="text-sm font-normal text-muted-foreground">
//                 Progress: {Math.round(progress)}%
//               </span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="mb-4">{currentQuestion.question_text}</p>
//             <RadioGroup value={answers[currentQuestion._id]} onValueChange={handleAnswerChange}>
//               {currentQuestion.options.map(option => (
//                 <div key={option._id} className="flex items-center mb-2">
//                   <RadioGroupItem value={option._id} id={option._id} />
//                   <Label htmlFor={option._id} className="ml-2">
//                     {option.option_text}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
//               <ChevronLeft className="mr-2" /> Previous
//             </Button>
//             {currentQuestionIndex === quiz.questions.length - 1 ? (
//               <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
//                 <AlertDialogTrigger asChild>
//                   <Button className="bg-blue-600 text-white">Submit</Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                   <AlertDialogHeader>
//                     <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
//                     <AlertDialogDescription>
//                       Are you sure you want to submit your answers?
//                     </AlertDialogDescription>
//                   </AlertDialogHeader>
//                   <AlertDialogFooter>
//                     <AlertDialogCancel onClick={() => setShowSubmitDialog(false)}>Cancel</AlertDialogCancel>
//                     <AlertDialogAction onClick={() => {
//                       handleSubmit();
//                       setShowSubmitDialog(false);
//                     }}>Yes, submit</AlertDialogAction>
//                   </AlertDialogFooter>
//                 </AlertDialogContent>
//               </AlertDialog>
//             ) : (
//               <Button onClick={goToNextQuestion} className="bg-green-600 text-white">
//                 Next <ChevronRight className="ml-2" />
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }

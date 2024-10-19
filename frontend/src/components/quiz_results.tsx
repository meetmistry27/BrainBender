import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Progress } from "../components/ui/progress.tsx";
import { Badge } from "../components/ui/badge.tsx";
import { Clock, Trophy } from 'lucide-react';

interface QuizResult {
  quiz_id: string;
  user_id: string;
  score: number;
  completed_at: string;
  time_taken: number;
  quizTitle: string;
  totalQuestions: number;
}

export default function QuizResultPage() {
  const { quizTakeId } = useParams<{ quizTakeId: string }>();
  const [result, setResult] = React.useState<QuizResult | null>(null);

  React.useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quiztakes/get/${quizTakeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz result');
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching quiz result:', error);
      }
    };

    fetchQuizResult();
  }, [quizTakeId]);

  if (!result) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const scorePercentage = (result.score / result.totalQuestions) * 100;
  const minutes = Math.floor(result.time_taken / 60);
  const seconds = result.time_taken % 60;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Quiz Result</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{result.quizTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-4xl font-bold text-primary">{result.score}/{result.totalQuestions}</div>
              <Badge variant={scorePercentage >= 70 ? "success" : "destructive"} className="text-lg">
                {scorePercentage.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={scorePercentage} className="h-4 mb-6" />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Time: {minutes}m {seconds}s</span>
              </div>
              <div className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                <span>
                  {scorePercentage >= 90 ? 'Excellent!' :
                   scorePercentage >= 70 ? 'Great job!' :
                   scorePercentage >= 50 ? 'Good effort!' : 'Keep practicing!'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
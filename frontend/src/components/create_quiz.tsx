import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { Button } from "../components/ui/button.tsx"
import { Input } from "../components/ui/input.tsx"
import { Label } from "../components/ui/label.tsx"
import { Textarea } from "../components/ui/textarea.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx"
import { Checkbox } from "../components/ui/checkbox.tsx"
import { PlusCircle, Trash2 } from 'lucide-react'


interface Question {
  id: string
  text: string
  options: { id: string; text: string; isCorrect: boolean }[]
}

export default function CreateQuizPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      options: [
        { id: '1', text: '', isCorrect: false },
        { id: '2', text: '', isCorrect: false },
        { id: '3', text: '', isCorrect: false },
        { id: '4', text: '', isCorrect: false },
      ],
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q))
  }

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map(o => o.id === optionId ? { ...o, text } : o) }
        : q
    ))
  }

  const toggleCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map(o => ({ ...o, isCorrect: o.id === optionId })) }
        : q
    ))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the quiz data to your backend
    console.log({ title, description, difficulty, questions })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create a New Quiz
        </motion.h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Provide the basic information about your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e:any) => setTitle(e.target.value)} 
                  placeholder="Enter quiz title" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e:any) => setDescription(e.target.value)} 
                  placeholder="Enter quiz description" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {questions.map((question, index) => (
            <Card key={question.id} className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Question {index + 1}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeQuestion(question.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                  <Input 
                    id={`question-${question.id}`}
                    value={question.text} 
                    onChange={(e) => updateQuestion(question.id, e.target.value)} 
                    placeholder="Enter question text" 
                    required 
                  />
                </div>
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`question-${question.id}-option-${option.id}`}
                      checked={option.isCorrect}
                      onCheckedChange={() => toggleCorrectOption(question.id, option.id)}
                    />
                    <Input 
                      value={option.text} 
                      onChange={(e) => updateOption(question.id, option.id, e.target.value)} 
                      placeholder={`Option ${option.id}`} 
                      required 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Button 
            type="button" 
            variant="outline" 
            className="w-full mb-6"
            onClick={addQuestion}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
          </Button>

          <Button type="submit" className="w-full">Create Quiz</Button>
        </form>
      </div>
    </div>
  )
}
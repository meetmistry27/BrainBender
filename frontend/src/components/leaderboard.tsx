import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.tsx";
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Trophy, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  questionsAttempted: number;
  questionsCorrect: number;
  totalTime: number; // in seconds
}

const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Alex Johnson", score: 2500, questionsAttempted: 50, questionsCorrect: 45, totalTime: 1800 },
  { rank: 2, name: "Sam Smith", score: 2350, questionsAttempted: 48, questionsCorrect: 42, totalTime: 1700 },
  { rank: 3, name: "Jamie Lee", score: 2200, questionsAttempted: 45, questionsCorrect: 40, totalTime: 1600 },
  { rank: 4, name: "Taylor Swift", score: 2100, questionsAttempted: 43, questionsCorrect: 38, totalTime: 1550 },
  { rank: 5, name: "Chris Martin", score: 2000, questionsAttempted: 40, questionsCorrect: 35, totalTime: 1500 },
  // Add more entries as needed
];

export default function LeaderboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 5;

  const filteredData = mockLeaderboardData.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <ul className="flex space-x-4 justify-center">
            {[{ name: 'Home', path: '/' }, { name: 'Leaderboard', path: '/leaderboard' }, { name: 'Analytics', path: '/analytics' }, { name: 'Profile', path: '/profile' }].map(item => (
              <li key={item.name}>
                <Link to={item.path} className={`text-sm font-medium transition-colors hover:text-primary ${item.name === 'Leaderboard' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <motion.h1 className="text-4xl font-bold mb-8 text-center text-primary" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Quiz Leaderboard
        </motion.h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search players" className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Questions Attempted</TableHead>
                    <TableHead className="text-right">Questions Correct</TableHead>
                    <TableHead className="text-right">Total Time (min)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((player, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{player.rank}</TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.score}</TableCell>
                      <TableCell className="text-right">{player.questionsAttempted}</TableCell>
                      <TableCell className="text-right">{player.questionsCorrect}</TableCell>
                      <TableCell className="text-right">{(player.totalTime / 60).toFixed(2)}</TableCell> {/* Convert seconds to minutes */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
              <Button variant="outline" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

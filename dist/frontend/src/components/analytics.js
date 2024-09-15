"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnalyticsContent;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const card_1 = require("./ui/card");
const recharts_1 = require("recharts");
const lucide_react_1 = require("lucide-react");
const mockQuizAttempts = [
    { id: '1', title: 'General Knowledge', date: '2023-06-01', score: 18, totalQuestions: 20, timeSpent: 15, difficulty: 'Easy' },
    { id: '2', title: 'Science Quiz', date: '2023-06-05', score: 22, totalQuestions: 25, timeSpent: 20, difficulty: 'Medium' },
    { id: '3', title: 'History Trivia', date: '2023-06-10', score: 27, totalQuestions: 30, timeSpent: 25, difficulty: 'Hard' },
    { id: '4', title: 'Pop Culture', date: '2023-06-15', score: 13, totalQuestions: 15, timeSpent: 12, difficulty: 'Easy' },
    { id: '5', title: 'Technology Test', date: '2023-06-20', score: 19, totalQuestions: 22, timeSpent: 18, difficulty: 'Medium' },
];
const performanceData = [
    { name: 'General Knowledge', correct: 18, incorrect: 2 },
    { name: 'Science Quiz', correct: 22, incorrect: 3 },
    { name: 'History Trivia', correct: 27, incorrect: 3 },
    { name: 'Pop Culture', correct: 13, incorrect: 2 },
    { name: 'Technology Test', correct: 19, incorrect: 3 },
];
const difficultyPerformanceData = [
    { name: 'Easy', value: 31, fill: '#4ade80' },
    { name: 'Medium', value: 41, fill: '#facc15' },
    { name: 'Hard', value: 27, fill: '#f87171' },
];
function AnalyticsContent() {
    const totalQuizzes = mockQuizAttempts.length;
    const totalQuestions = mockQuizAttempts.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
    const totalCorrect = mockQuizAttempts.reduce((sum, quiz) => sum + quiz.score, 0);
    const averageScore = totalCorrect / totalQuizzes;
    const totalTimeSpent = mockQuizAttempts.reduce((sum, quiz) => sum + quiz.timeSpent, 0);
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gray-100 p-6" },
        react_1.default.createElement("div", { className: "max-w-6xl mx-auto" },
            react_1.default.createElement("nav", { className: "mb-8" },
                react_1.default.createElement("ul", { className: "flex space-x-4 justify-center" }, ['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (react_1.default.createElement("li", { key: item },
                    react_1.default.createElement(react_router_dom_1.Link, { to: item === 'Home' ? '/' : `/${item.toLowerCase()}`, className: `text-sm font-medium transition-colors hover:text-primary ${item === 'Analytics' ? 'text-primary' : 'text-muted-foreground'}` }, item)))))),
            react_1.default.createElement(framer_motion_1.motion.h1, { className: "text-4xl font-bold mb-8 text-center text-primary", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "Your Quiz Analytics"),
            react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" },
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                        react_1.default.createElement(card_1.CardTitle, { className: "text-sm font-medium" }, "Total Quizzes Taken"),
                        react_1.default.createElement(lucide_react_1.Brain, { className: "h-4 w-4 text-muted-foreground" })),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "text-2xl font-bold" }, totalQuizzes))),
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                        react_1.default.createElement(card_1.CardTitle, { className: "text-sm font-medium" }, "Average Score"),
                        react_1.default.createElement(lucide_react_1.Target, { className: "h-4 w-4 text-muted-foreground" })),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "text-2xl font-bold" }, averageScore.toFixed(2)))),
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                        react_1.default.createElement(card_1.CardTitle, { className: "text-sm font-medium" }, "Total Questions Answered"),
                        react_1.default.createElement(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-muted-foreground" })),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "text-2xl font-bold" }, totalQuestions))),
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
                        react_1.default.createElement(card_1.CardTitle, { className: "text-sm font-medium" }, "Total Time Spent"),
                        react_1.default.createElement(lucide_react_1.Clock, { className: "h-4 w-4 text-muted-foreground" })),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "text-2xl font-bold" },
                            totalTimeSpent,
                            " minutes")))),
            react_1.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" },
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, null, "Performance by Quiz")),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "h-[300px]" },
                            react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
                                react_1.default.createElement(recharts_1.BarChart, { data: performanceData },
                                    react_1.default.createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
                                    react_1.default.createElement(recharts_1.XAxis, { dataKey: "name" }),
                                    react_1.default.createElement(recharts_1.YAxis, null),
                                    react_1.default.createElement(recharts_1.Tooltip, null),
                                    react_1.default.createElement(recharts_1.Legend, null),
                                    react_1.default.createElement(recharts_1.Bar, { dataKey: "correct", fill: "#4ade80", name: "Correct Answers" }),
                                    react_1.default.createElement(recharts_1.Bar, { dataKey: "incorrect", fill: "#f87171", name: "Incorrect Answers" })))))),
                react_1.default.createElement(card_1.Card, null,
                    react_1.default.createElement(card_1.CardHeader, null,
                        react_1.default.createElement(card_1.CardTitle, null, "Performance by Difficulty")),
                    react_1.default.createElement(card_1.CardContent, null,
                        react_1.default.createElement("div", { className: "h-[300px]" },
                            react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: "100%" },
                                react_1.default.createElement(recharts_1.PieChart, null,
                                    react_1.default.createElement(recharts_1.Pie, { data: difficultyPerformanceData, cx: "50%", cy: "50%", labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` }, difficultyPerformanceData.map((entry, index) => (react_1.default.createElement(recharts_1.Cell, { key: `cell-${index}`, fill: entry.fill })))),
                                    react_1.default.createElement(recharts_1.Tooltip, null),
                                    react_1.default.createElement(recharts_1.Legend, null))))))),
            react_1.default.createElement(card_1.Card, null,
                react_1.default.createElement(card_1.CardHeader, null,
                    react_1.default.createElement(card_1.CardTitle, null, "Recent Quiz Attempts")),
                react_1.default.createElement(card_1.CardContent, null,
                    react_1.default.createElement("div", { className: "space-y-8" }, mockQuizAttempts.map((quiz) => (react_1.default.createElement("div", { key: quiz.id, className: "flex items-center" },
                        react_1.default.createElement(lucide_react_1.Award, { className: "h-9 w-9 text-primary" }),
                        react_1.default.createElement("div", { className: "ml-4 space-y-1" },
                            react_1.default.createElement("p", { className: "text-sm font-medium leading-none" }, quiz.title),
                            react_1.default.createElement("p", { className: "text-sm text-muted-foreground" },
                                "Date: ",
                                quiz.date,
                                " | Time Spent: ",
                                quiz.timeSpent,
                                " minutes | Difficulty: ",
                                quiz.difficulty)),
                        react_1.default.createElement("div", { className: "ml-auto font-medium" },
                            "Score: ",
                            quiz.score,
                            "/",
                            quiz.totalQuestions))))))))));
}
//# sourceMappingURL=analytics.js.map
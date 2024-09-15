"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuizzesPage;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const card_1 = require("./ui/card");
const button_1 = require("./ui/button");
const input_1 = require("./ui/input");
const lucide_react_1 = require("lucide-react");
const mockQuizzes = [
    {
        id: '1',
        title: 'General Knowledge Master',
        description: 'Test your knowledge on a variety of topics!',
        questionCount: 20,
        timeLimit: 15,
        participants: 1500
    },
    {
        id: '2',
        title: 'Science Spectacular',
        description: 'Explore the wonders of science with this challenging quiz!',
        questionCount: 25,
        timeLimit: 20,
        participants: 1200
    },
    {
        id: '3',
        title: 'History Buff',
        description: 'Journey through time with this history-focused quiz!',
        questionCount: 30,
        timeLimit: 25,
        participants: 1000
    },
    {
        id: '4',
        title: 'Pop Culture Guru',
        description: 'How well do you know movies, music, and celebrities?',
        questionCount: 15,
        timeLimit: 10,
        participants: 2000
    },
    {
        id: '5',
        title: 'Tech Wizard',
        description: 'Put your technology knowledge to the test!',
        questionCount: 22,
        timeLimit: 18,
        participants: 800
    },
    {
        id: '6',
        title: 'Sports Fanatic',
        description: 'From football to cricket, test your sports knowledge!',
        questionCount: 25,
        timeLimit: 20,
        participants: 1800
    }
];
function QuizzesPage() {
    const [searchTerm, setSearchTerm] = react_1.default.useState('');
    const filteredQuizzes = mockQuizzes.filter(quiz => quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gray-100 p-6" },
        react_1.default.createElement("div", { className: "max-w-6xl mx-auto" },
            react_1.default.createElement("nav", { className: "mb-8" },
                react_1.default.createElement("ul", { className: "flex space-x-4 justify-center" }, ['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (react_1.default.createElement("li", { key: item },
                    react_1.default.createElement(react_router_dom_1.Link, { to: item === 'Home' ? '/' : `/${item.toLowerCase()}`, className: `text-sm font-medium transition-colors hover:text-primary ${item === 'Quizzes' ? 'text-primary' : 'text-muted-foreground'}` }, item)))))),
            react_1.default.createElement(framer_motion_1.motion.h1, { className: "text-4xl font-bold mb-8 text-center text-primary", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "Explore Quizzes"),
            react_1.default.createElement("div", { className: "mb-8 relative" },
                react_1.default.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }),
                react_1.default.createElement(input_1.Input, { type: "text", placeholder: "Search quizzes...", className: "pl-10 pr-4 py-2 w-full", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })),
            react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, filteredQuizzes.map((quiz) => (react_1.default.createElement(framer_motion_1.motion.div, { key: quiz.id, initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3 } },
                react_1.default.createElement(card_1.Card, { className: "h-full flex flex-col transition-shadow duration-300 hover:shadow-lg" },
                    react_1.default.createElement(card_1.CardHeader, { className: "bg-gray-200 p-4 rounded-t-lg" },
                        react_1.default.createElement(card_1.CardTitle, { className: "text-xl font-bold text-gray-800" }, quiz.title)),
                    react_1.default.createElement(card_1.CardContent, { className: "flex-grow p-4" },
                        react_1.default.createElement("p", { className: "text-gray-600 mb-2" }, quiz.description),
                        react_1.default.createElement("div", { className: "border-t border-gray-300 mt-2 pt-2" },
                            react_1.default.createElement("div", { className: "flex justify-between text-sm" },
                                react_1.default.createElement("div", { className: "flex flex-col items-start mr-4" },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        react_1.default.createElement(lucide_react_1.BookOpen, { className: "w-4 h-4 mr-1 text-gray-400" }),
                                        react_1.default.createElement("span", { className: "font-medium text-gray-800" }, quiz.questionCount)),
                                    react_1.default.createElement("span", { className: "text-gray-500" }, "questions")),
                                react_1.default.createElement("div", { className: "flex flex-col items-start mr-4" },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        react_1.default.createElement(lucide_react_1.Clock, { className: "w-4 h-4 mr-1 text-gray-400" }),
                                        react_1.default.createElement("span", { className: "font-medium text-gray-800" }, quiz.timeLimit)),
                                    react_1.default.createElement("span", { className: "text-gray-500" }, "minutes")),
                                react_1.default.createElement("div", { className: "flex flex-col items-start" },
                                    react_1.default.createElement("div", { className: "flex items-center" },
                                        react_1.default.createElement(lucide_react_1.Users, { className: "w-4 h-4 mr-1 text-gray-400" }),
                                        react_1.default.createElement("span", { className: "font-medium text-gray-800" }, quiz.participants)),
                                    react_1.default.createElement("span", { className: "text-gray-500" }, "participants"))))),
                    react_1.default.createElement(card_1.CardFooter, { className: "flex justify-between p-4" },
                        react_1.default.createElement(button_1.Button, { variant: "outline", className: "flex-1 mr-2" }, "Start Quiz"),
                        react_1.default.createElement(react_router_dom_1.Link, { to: `/quizzes/leaderboard/${quiz.id}` },
                            react_1.default.createElement(button_1.Button, { variant: "secondary", className: "flex-1" },
                                react_1.default.createElement(lucide_react_1.Trophy, { className: "w-4 h-4 mr-2" }),
                                "Leaderboard")))))))))));
}
//# sourceMappingURL=quizzes.js.map
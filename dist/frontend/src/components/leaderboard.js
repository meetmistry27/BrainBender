"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeaderboardPage;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const table_1 = require("../components/ui/table");
const input_1 = require("../components/ui/input");
const button_1 = require("../components/ui/button");
const card_1 = require("../components/ui/card");
const lucide_react_1 = require("lucide-react");
const mockLeaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 2500, questionsAttempted: 50, questionsCorrect: 45, totalTime: 1800 },
    { rank: 2, name: "Sam Smith", score: 2350, questionsAttempted: 48, questionsCorrect: 42, totalTime: 1700 },
    { rank: 3, name: "Jamie Lee", score: 2200, questionsAttempted: 45, questionsCorrect: 40, totalTime: 1600 },
    { rank: 4, name: "Taylor Swift", score: 2100, questionsAttempted: 43, questionsCorrect: 38, totalTime: 1550 },
    { rank: 5, name: "Chris Martin", score: 2000, questionsAttempted: 40, questionsCorrect: 35, totalTime: 1500 },
    // Add more entries as needed
];
function LeaderboardPage() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const itemsPerPage = 5;
    const filteredData = mockLeaderboardData.filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gray-100 p-6" },
        react_1.default.createElement("div", { className: "max-w-4xl mx-auto" },
            react_1.default.createElement("nav", { className: "mb-8" },
                react_1.default.createElement("ul", { className: "flex space-x-4 justify-center" }, [{ name: 'Home', path: '/' }, { name: 'Leaderboard', path: '/leaderboard' }, { name: 'Analytics', path: '/analytics' }, { name: 'Profile', path: '/profile' }].map(item => (react_1.default.createElement("li", { key: item.name },
                    react_1.default.createElement(react_router_dom_1.Link, { to: item.path, className: `text-sm font-medium transition-colors hover:text-primary ${item.name === 'Leaderboard' ? 'text-primary' : 'text-muted-foreground'}` }, item.name)))))),
            react_1.default.createElement(framer_motion_1.motion.h1, { className: "text-4xl font-bold mb-8 text-center text-primary", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "Quiz Leaderboard"),
            react_1.default.createElement(card_1.Card, { className: "mb-8" },
                react_1.default.createElement(card_1.CardHeader, null,
                    react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2 text-2xl" },
                        react_1.default.createElement(lucide_react_1.Trophy, { className: "h-6 w-6 text-yellow-500" }),
                        "Top Performers")),
                react_1.default.createElement(card_1.CardContent, null,
                    react_1.default.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0" },
                        react_1.default.createElement("div", { className: "relative w-full sm:w-64" },
                            react_1.default.createElement(lucide_react_1.Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
                            react_1.default.createElement(input_1.Input, { placeholder: "Search players", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }))),
                    react_1.default.createElement("div", { className: "overflow-x-auto" },
                        react_1.default.createElement(table_1.Table, null,
                            react_1.default.createElement(table_1.TableHeader, null,
                                react_1.default.createElement(table_1.TableRow, null,
                                    react_1.default.createElement(table_1.TableHead, { className: "w-[100px]" }, "Rank"),
                                    react_1.default.createElement(table_1.TableHead, null, "Name"),
                                    react_1.default.createElement(table_1.TableHead, null, "Score"),
                                    react_1.default.createElement(table_1.TableHead, { className: "text-right" }, "Questions Attempted"),
                                    react_1.default.createElement(table_1.TableHead, { className: "text-right" }, "Questions Correct"),
                                    react_1.default.createElement(table_1.TableHead, { className: "text-right" }, "Total Time (min)"))),
                            react_1.default.createElement(table_1.TableBody, null, currentData.map((player, index) => (react_1.default.createElement(table_1.TableRow, { key: index },
                                react_1.default.createElement(table_1.TableCell, { className: "font-medium" }, player.rank),
                                react_1.default.createElement(table_1.TableCell, null, player.name),
                                react_1.default.createElement(table_1.TableCell, null, player.score),
                                react_1.default.createElement(table_1.TableCell, { className: "text-right" }, player.questionsAttempted),
                                react_1.default.createElement(table_1.TableCell, { className: "text-right" }, player.questionsCorrect),
                                react_1.default.createElement(table_1.TableCell, { className: "text-right" }, (player.totalTime / 60).toFixed(2)),
                                " ")))))),
                    react_1.default.createElement("div", { className: "flex justify-between items-center mt-4" },
                        react_1.default.createElement(button_1.Button, { variant: "outline", onClick: () => setCurrentPage(prev => Math.max(prev - 1, 1)), disabled: currentPage === 1 },
                            react_1.default.createElement(lucide_react_1.ChevronLeft, { className: "h-4 w-4 mr-2" }),
                            "Previous"),
                        react_1.default.createElement("span", { className: "text-sm text-muted-foreground" },
                            "Page ",
                            currentPage,
                            " of ",
                            totalPages),
                        react_1.default.createElement(button_1.Button, { variant: "outline", onClick: () => setCurrentPage(prev => Math.min(prev + 1, totalPages)), disabled: currentPage === totalPages },
                            "Next",
                            react_1.default.createElement(lucide_react_1.ChevronRight, { className: "h-4 w-4 ml-2" }))))))));
}
//# sourceMappingURL=leaderboard.js.map
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
exports.default = HomePage;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("../components/ui/button");
const card_1 = require("../components/ui/card");
const lucide_react_1 = require("lucide-react");
require("./homepage.css");
function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Quizzes', path: '/quizzes' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Profile', path: '/profile' },
        { name: 'Login', path: '/auth' }
    ];
    return (react_1.default.createElement("div", { className: "home-container" },
        react_1.default.createElement("nav", { className: "navbar" },
            react_1.default.createElement(framer_motion_1.motion.div, { className: "logo", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "QuizMaster"),
            react_1.default.createElement("button", { className: "hamburger", onClick: () => setIsMenuOpen(!isMenuOpen) }, isMenuOpen ? react_1.default.createElement(lucide_react_1.X, null) : react_1.default.createElement(lucide_react_1.Menu, null)),
            react_1.default.createElement("ul", { className: `nav-links ${isMenuOpen ? 'open' : ''}` }, navItems.map((item, index) => (react_1.default.createElement(framer_motion_1.motion.li, { key: item.name, initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 } },
                react_1.default.createElement(react_router_dom_1.Link, { to: item.path, onClick: () => setIsMenuOpen(false) }, item.name)))))),
        react_1.default.createElement("header", { className: "home-header" },
            react_1.default.createElement(framer_motion_1.motion.h1, { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 } }, "Welcome to QuizMaster"),
            react_1.default.createElement(framer_motion_1.motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 } }, "Challenge Your Mind, Expand Your Knowledge")),
        react_1.default.createElement("main", { className: "home-main" },
            react_1.default.createElement("section", { className: "quiz-section" },
                react_1.default.createElement(framer_motion_1.motion.h2, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "Ready for a Challenge?"),
                react_1.default.createElement("div", { className: "quiz-buttons" },
                    react_1.default.createElement(button_1.Button, { variant: "default", size: "lg", className: "create-quiz-btn" }, "Create Quiz"),
                    react_1.default.createElement(button_1.Button, { variant: "secondary", size: "lg", className: "take-quiz-btn" }, "Take Quiz"))),
            react_1.default.createElement("section", { className: "features-section" },
                react_1.default.createElement(framer_motion_1.motion.h2, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "Why Choose QuizMaster?"),
                react_1.default.createElement("div", { className: "features-grid" }, [
                    { icon: react_1.default.createElement(lucide_react_1.BookOpen, { className: "feature-icon" }), title: 'Diverse Topics', description: 'Explore a wide range of subjects' },
                    { icon: react_1.default.createElement(lucide_react_1.Trophy, { className: "feature-icon" }), title: 'Compete', description: 'Challenge friends and climb the leaderboard' },
                    { icon: react_1.default.createElement(lucide_react_1.BarChart2, { className: "feature-icon" }), title: 'Track Progress', description: 'Monitor your improvement with detailed analytics' },
                    { icon: react_1.default.createElement(lucide_react_1.PenTool, { className: "feature-icon" }), title: 'Create Quizzes', description: 'Design your own quizzes and share with others' },
                ].map((feature, index) => (react_1.default.createElement(framer_motion_1.motion.div, { key: feature.title, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 } },
                    react_1.default.createElement(card_1.Card, null,
                        react_1.default.createElement(card_1.CardHeader, null,
                            react_1.default.createElement(card_1.CardTitle, { className: "flex items-center gap-2" },
                                feature.icon,
                                feature.title)),
                        react_1.default.createElement(card_1.CardContent, null,
                            react_1.default.createElement("p", null, feature.description))))))))),
        react_1.default.createElement("footer", { className: "home-footer" },
            react_1.default.createElement("p", null, "\u00A9 2023 QuizMaster. All rights reserved."))));
}
//# sourceMappingURL=homepage.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const homepage_1 = __importDefault(require("./components/homepage"));
const leaderboard_1 = __importDefault(require("./components/leaderboard"));
const quizzes_1 = __importDefault(require("./components/quizzes")); // Ensure QuizzesPage is imported correctly
const analytics_1 = __importDefault(require("./components/analytics"));
const profile_1 = __importDefault(require("./components/profile"));
const auth_1 = require("./components/auth");
const App = () => {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(homepage_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/quizzes/leaderboard/:quizId?", element: react_1.default.createElement(leaderboard_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/quizzes", element: react_1.default.createElement(quizzes_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/analytics", element: react_1.default.createElement(analytics_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/profile", element: react_1.default.createElement(profile_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/auth', element: react_1.default.createElement(auth_1.LoginSignupPage, null) }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map
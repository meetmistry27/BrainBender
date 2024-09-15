"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSignupPage = LoginSignupPage;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const card_1 = require("../components/ui/card");
const button_1 = require("../components/ui/button");
const input_1 = require("../components/ui/input");
const label_1 = require("../components/ui/label");
const tabs_1 = require("../components/ui/tabs");
const checkbox_1 = require("../components/ui/checkbox");
const lucide_react_1 = require("lucide-react");
function LoginSignupPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [showPassword, setShowPassword] = react_1.default.useState(false);
    const [isLoading, setIsLoading] = react_1.default.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 2000);
    };
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gray-100 flex items-center justify-center p-4" },
        react_1.default.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "w-full max-w-md" },
            react_1.default.createElement(card_1.Card, null,
                react_1.default.createElement(card_1.CardHeader, { className: "space-y-1" },
                    react_1.default.createElement(card_1.CardTitle, { className: "text-2xl font-bold text-center" }, "Welcome to QuizMaster"),
                    react_1.default.createElement(card_1.CardDescription, { className: "text-center" }, "Enter your details to get started")),
                react_1.default.createElement(tabs_1.Tabs, { defaultValue: "login", className: "w-full" },
                    react_1.default.createElement(tabs_1.TabsList, { className: "grid w-full grid-cols-2" },
                        react_1.default.createElement(tabs_1.TabsTrigger, { value: "login" }, "Login"),
                        react_1.default.createElement(tabs_1.TabsTrigger, { value: "signup" }, "Sign Up")),
                    react_1.default.createElement(tabs_1.TabsContent, { value: "login" },
                        react_1.default.createElement("form", { onSubmit: handleSubmit },
                            react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                                react_1.default.createElement("div", { className: "space-y-2" },
                                    react_1.default.createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                                    react_1.default.createElement("div", { className: "relative" },
                                        react_1.default.createElement(lucide_react_1.Mail, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                                        react_1.default.createElement(input_1.Input, { id: "email", type: "email", placeholder: "m@example.com", className: "pl-9", required: true }))),
                                react_1.default.createElement("div", { className: "space-y-2" },
                                    react_1.default.createElement(label_1.Label, { htmlFor: "password" }, "Password"),
                                    react_1.default.createElement("div", { className: "relative" },
                                        react_1.default.createElement(lucide_react_1.Lock, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                                        react_1.default.createElement(input_1.Input, { id: "password", type: showPassword ? "text" : "password", className: "pl-9 pr-9", required: true }),
                                        react_1.default.createElement("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-gray-400" }, showPassword ? react_1.default.createElement(lucide_react_1.EyeOff, { className: "h-4 w-4" }) : react_1.default.createElement(lucide_react_1.Eye, { className: "h-4 w-4" })))),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(checkbox_1.Checkbox, { id: "remember" }),
                                    react_1.default.createElement("label", { htmlFor: "remember", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" }, "Remember me"))),
                            react_1.default.createElement(card_1.CardFooter, { className: "flex flex-col space-y-4" },
                                react_1.default.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? "Logging in..." : "Login"),
                                react_1.default.createElement("div", { className: "relative" },
                                    react_1.default.createElement("div", { className: "absolute inset-0 flex items-center" },
                                        react_1.default.createElement("span", { className: "w-full border-t" })),
                                    react_1.default.createElement("div", { className: "relative flex justify-center text-xs uppercase" },
                                        react_1.default.createElement("span", { className: "bg-white px-2 text-muted-foreground" }, "Or continue with"))),
                                react_1.default.createElement(button_1.Button, { variant: "outline", type: "button", className: "w-full" },
                                    react_1.default.createElement("svg", { className: "mr-2 h-4 w-4", "aria-hidden": "true", focusable: "false", "data-prefix": "fab", "data-icon": "google", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 488 512" },
                                        react_1.default.createElement("path", { fill: "currentColor", d: "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" })),
                                    "Google")))),
                    react_1.default.createElement(tabs_1.TabsContent, { value: "signup" },
                        react_1.default.createElement("form", { onSubmit: handleSubmit },
                            react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                                react_1.default.createElement("div", { className: "space-y-2" },
                                    react_1.default.createElement(label_1.Label, { htmlFor: "name" }, "Name"),
                                    react_1.default.createElement("div", { className: "relative" },
                                        react_1.default.createElement(lucide_react_1.User, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                                        react_1.default.createElement(input_1.Input, { id: "name", placeholder: "John Doe", className: "pl-9", required: true }))),
                                react_1.default.createElement("div", { className: "space-y-2" },
                                    react_1.default.createElement(label_1.Label, { htmlFor: "signup-email" }, "Email"),
                                    react_1.default.createElement("div", { className: "relative" },
                                        react_1.default.createElement(lucide_react_1.Mail, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                                        react_1.default.createElement(input_1.Input, { id: "signup-email", type: "email", placeholder: "m@example.com", className: "pl-9", required: true }))),
                                react_1.default.createElement("div", { className: "space-y-2" },
                                    react_1.default.createElement(label_1.Label, { htmlFor: "signup-password" }, "Password"),
                                    react_1.default.createElement("div", { className: "relative" },
                                        react_1.default.createElement(lucide_react_1.Lock, { className: "absolute left-3 top-3 h-4 w-4 text-gray-400" }),
                                        react_1.default.createElement(input_1.Input, { id: "signup-password", type: showPassword ? "text" : "password", className: "pl-9 pr-9", required: true }),
                                        react_1.default.createElement("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-gray-400" }, showPassword ? react_1.default.createElement(lucide_react_1.EyeOff, { className: "h-4 w-4" }) : react_1.default.createElement(lucide_react_1.Eye, { className: "h-4 w-4" })))),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(checkbox_1.Checkbox, { id: "terms", required: true }),
                                    react_1.default.createElement("label", { htmlFor: "terms", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" },
                                        "I agree to the ",
                                        react_1.default.createElement("a", { href: "#", className: "text-primary hover:underline" }, "Terms of Service"),
                                        " and ",
                                        react_1.default.createElement("a", { href: "#", className: "text-primary hover:underline" }, "Privacy Policy")))),
                            react_1.default.createElement(card_1.CardFooter, { className: "flex flex-col space-y-4" },
                                react_1.default.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? "Creating account..." : "Create account"),
                                react_1.default.createElement("div", { className: "relative" },
                                    react_1.default.createElement("div", { className: "absolute inset-0 flex items-center" },
                                        react_1.default.createElement("span", { className: "w-full border-t" })),
                                    react_1.default.createElement("div", { className: "relative flex justify-center text-xs uppercase" },
                                        react_1.default.createElement("span", { className: "bg-white px-2 text-muted-foreground" }, "Or continue with"))),
                                react_1.default.createElement(button_1.Button, { variant: "outline", type: "button", className: "w-full" },
                                    react_1.default.createElement("svg", { className: "mr-2 h-4 w-4", "aria-hidden": "true", focusable: "false", "data-prefix": "fab", "data-icon": "google", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 488 512" },
                                        react_1.default.createElement("path", { fill: "currentColor", d: "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" })),
                                    "Google")))))))));
}
//# sourceMappingURL=auth.js.map
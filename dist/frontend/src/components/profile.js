"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfilePage;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("../components/ui/button");
const card_1 = require("../components/ui/card");
const lucide_react_1 = require("lucide-react");
const tabs_1 = require("../components/ui/tabs");
const label_1 = require("./ui/label");
const input_1 = require("./ui/input");
const mockUserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z"
};
function ProfilePage() {
    const [isEditing, setIsEditing] = react_1.default.useState(false);
    return (react_1.default.createElement("div", { className: "min-h-screen bg-gray-100 p-6" },
        react_1.default.createElement("nav", { className: "mb-8" },
            react_1.default.createElement("ul", { className: "flex space-x-4 justify-center" }, ['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (react_1.default.createElement("li", { key: item },
                react_1.default.createElement(react_router_dom_1.Link, { to: item === 'Home' ? '/' : `/${item.toLowerCase()}`, className: `text-sm font-medium transition-colors hover:text-primary ${item === 'Profile' ? 'text-primary' : 'text-muted-foreground'}` }, item)))))),
        react_1.default.createElement("div", { className: "max-w-4xl mx-auto" },
            react_1.default.createElement(framer_motion_1.motion.h1, { className: "text-4xl font-bold mb-8 text-center text-primary", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }, "Your Profile"),
            react_1.default.createElement(tabs_1.Tabs, { defaultValue: "profile", className: "w-full" },
                react_1.default.createElement(tabs_1.TabsList, { className: "grid w-full grid-cols-2" },
                    react_1.default.createElement(tabs_1.TabsTrigger, { value: "profile" }, "Profile Information"),
                    react_1.default.createElement(tabs_1.TabsTrigger, { value: "security" }, "Security Settings")),
                react_1.default.createElement(tabs_1.TabsContent, { value: "profile" },
                    react_1.default.createElement(card_1.Card, null,
                        react_1.default.createElement(card_1.CardHeader, null,
                            react_1.default.createElement(card_1.CardTitle, null, "Profile Information"),
                            react_1.default.createElement(card_1.CardDescription, null, "View and manage your profile details")),
                        react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: "name" }, "Name"),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(lucide_react_1.User, { className: "text-gray-500" }),
                                    react_1.default.createElement(input_1.Input, { id: "name", defaultValue: mockUserProfile.name, readOnly: !isEditing, className: isEditing ? "border-primary" : "" }))),
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: "email" }, "Email"),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(lucide_react_1.Mail, { className: "text-gray-500" }),
                                    react_1.default.createElement(input_1.Input, { id: "email", type: "email", defaultValue: mockUserProfile.email, readOnly: !isEditing, className: isEditing ? "border-primary" : "" }))),
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: '' }, "Account Created"),
                                react_1.default.createElement("div", { className: "text-sm text-gray-500" }, new Date(mockUserProfile.createdAt).toLocaleDateString())),
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: '' }, "Last Updated"),
                                react_1.default.createElement("div", { className: "text-sm text-gray-500" }, new Date(mockUserProfile.updatedAt).toLocaleDateString()))),
                        react_1.default.createElement(card_1.CardFooter, null, isEditing ? (react_1.default.createElement("div", { className: "flex space-x-2 w-full" },
                            react_1.default.createElement(button_1.Button, { className: "flex-1", onClick: () => setIsEditing(false) }, "Save Changes"),
                            react_1.default.createElement(button_1.Button, { variant: "outline", className: "flex-1", onClick: () => setIsEditing(false) }, "Cancel"))) : (react_1.default.createElement(button_1.Button, { className: "w-full", onClick: () => setIsEditing(true) }, "Edit Profile"))))),
                react_1.default.createElement(tabs_1.TabsContent, { value: "security" },
                    react_1.default.createElement(card_1.Card, null,
                        react_1.default.createElement(card_1.CardHeader, null,
                            react_1.default.createElement(card_1.CardTitle, null, "Security Settings"),
                            react_1.default.createElement(card_1.CardDescription, null, "Manage your account security")),
                        react_1.default.createElement(card_1.CardContent, { className: "space-y-4" },
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: "current-password" }, "Current Password"),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(lucide_react_1.Key, { className: "text-gray-500" }),
                                    react_1.default.createElement(input_1.Input, { id: "current-password", type: "password" }))),
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: "new-password" }, "New Password"),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(lucide_react_1.Key, { className: "text-gray-500" }),
                                    react_1.default.createElement(input_1.Input, { id: "new-password", type: "password" }))),
                            react_1.default.createElement("div", { className: "space-y-2" },
                                react_1.default.createElement(label_1.Label, { htmlFor: "confirm-password" }, "Confirm New Password"),
                                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                                    react_1.default.createElement(lucide_react_1.Key, { className: "text-gray-500" }),
                                    react_1.default.createElement(input_1.Input, { id: "confirm-password", type: "password" }))),
                            react_1.default.createElement("div", { className: "flex items-center p-4 text-amber-800 bg-amber-50 rounded-md" },
                                react_1.default.createElement(lucide_react_1.AlertTriangle, { className: "h-5 w-5 mr-2 text-amber-500" }),
                                react_1.default.createElement("p", { className: "text-sm" }, "Ensure your new password is strong and unique."))),
                        react_1.default.createElement(card_1.CardFooter, null,
                            react_1.default.createElement(button_1.Button, { className: "w-full" }, "Update Password"))))))));
}
//# sourceMappingURL=profile.js.map
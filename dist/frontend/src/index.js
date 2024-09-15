"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css"); // Import Tailwind CSS here
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = client_1.default.createRoot(rootElement);
    root.render(react_1.default.createElement(react_1.default.StrictMode, null,
        react_1.default.createElement(App_1.default, null)));
}
else {
    console.error('Element with ID "root" not found.');
}
(0, reportWebVitals_1.default)();
//# sourceMappingURL=index.js.map
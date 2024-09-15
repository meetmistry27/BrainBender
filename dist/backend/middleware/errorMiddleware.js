"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const handleErrors = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Pass any errors to the default error handler
    };
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=errorMiddleware.js.map
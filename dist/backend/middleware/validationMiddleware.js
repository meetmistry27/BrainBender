"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAnalyticsUpdate = exports.validateAnalyticsCreation = exports.validateLeaderboardEntryUpdate = exports.validateLeaderboardEntryCreation = exports.validateQuizTakeUpdate = exports.validateQuizTakeCreation = exports.validateUserUpdate = exports.validateUserCreation = void 0;
// Validation middleware for user creation
const validateUserCreation = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add more validation logic as needed
    next();
};
exports.validateUserCreation = validateUserCreation;
// Validation middleware for user updates
const validateUserUpdate = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    // Add more validation logic as needed
    next();
};
exports.validateUserUpdate = validateUserUpdate;
// Validation middleware for quiz take creation
const validateQuizTakeCreation = (req, res, next) => {
    const { quiz_id, user_id, score, completed_at, time_taken } = req.body;
    if (!quiz_id || !user_id || score == null || !completed_at || time_taken == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add more validation logic as needed
    next();
};
exports.validateQuizTakeCreation = validateQuizTakeCreation;
// Validation middleware for quiz take updates
const validateQuizTakeUpdate = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Quiz take ID is required" });
    }
    // Add more validation logic as needed
    next();
};
exports.validateQuizTakeUpdate = validateQuizTakeUpdate;
// Validation middleware for leaderboard entry creation
const validateLeaderboardEntryCreation = (req, res, next) => {
    const { quiz_id, user_id, score, rank } = req.body;
    if (!quiz_id || !user_id || score == null || rank == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add additional validation logic as needed
    next();
};
exports.validateLeaderboardEntryCreation = validateLeaderboardEntryCreation;
// Validation middleware for leaderboard entry updates
const validateLeaderboardEntryUpdate = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Leaderboard entry ID is required" });
    }
    // Add additional validation logic as needed
    next();
};
exports.validateLeaderboardEntryUpdate = validateLeaderboardEntryUpdate;
// Validation middleware for analytics creation
const validateAnalyticsCreation = (req, res, next) => {
    const { quiz_id, user_id, performance_data } = req.body;
    if (!quiz_id || !user_id || !performance_data) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add additional validation logic as needed
    next();
};
exports.validateAnalyticsCreation = validateAnalyticsCreation;
// Validation middleware for analytics updates
const validateAnalyticsUpdate = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Analytics entry ID is required" });
    }
    // Add additional validation logic as needed
    next();
};
exports.validateAnalyticsUpdate = validateAnalyticsUpdate;
//# sourceMappingURL=validationMiddleware.js.map
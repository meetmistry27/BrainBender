import { Request, Response, NextFunction } from 'express';

// Validation middleware for user creation
export const validateUserCreation = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add more validation logic as needed
    next();
};

// Validation middleware for user updates
export const validateUserUpdate = (req: Request, res: Response, next: NextFunction): void | Response => {
    if (!req.params.id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    // Add more validation logic as needed
    next();
};

// Validation middleware for quiz take creation
export const validateQuizTakeCreation = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { quiz_id, user_id, score, completed_at, time_taken } = req.body;
    if (!quiz_id || !user_id || score == null || !completed_at || time_taken == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add more validation logic as needed
    next();
};

// Validation middleware for quiz take updates
export const validateQuizTakeUpdate = (req: Request, res: Response, next: NextFunction): void | Response => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Quiz take ID is required" });
    }
    // Add more validation logic as needed
    next();
};

// Validation middleware for leaderboard entry creation
export const validateLeaderboardEntryCreation = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { quiz_id, user_id, score, rank } = req.body;
    if (!quiz_id || !user_id || score == null || rank == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add additional validation logic as needed
    next();
};

// Validation middleware for leaderboard entry updates
export const validateLeaderboardEntryUpdate = (req: Request, res: Response, next: NextFunction): void | Response => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Leaderboard entry ID is required" });
    }
    // Add additional validation logic as needed
    next();
};

// Validation middleware for analytics creation
export const validateAnalyticsCreation = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { quiz_id, user_id, performance_data } = req.body;
    if (!quiz_id || !user_id || !performance_data) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add additional validation logic as needed
    next();
};

// Validation middleware for analytics updates
export const validateAnalyticsUpdate = (req: Request, res: Response, next: NextFunction): void | Response => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Analytics entry ID is required" });
    }
    // Add additional validation logic as needed
    next();
};

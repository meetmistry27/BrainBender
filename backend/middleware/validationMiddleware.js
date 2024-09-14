export const validateUserCreation = (req, res, next) => {
    // Implement validation logic for user creation
    // Example: check for required fields
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add more validation logic as needed
    next();
};

export const validateUserUpdate = (req, res, next) => {
    // Implement validation logic for user updates
    // Example: check if user ID is valid
    if (!req.params.id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    // Add more validation logic as needed
    next();
};

export const validateQuizTakeCreation = (req, res, next) => {
    // Implement validation logic for quiz take creation
    // Example: check for required fields
    const { quiz_id, user_id, score, completed_at, time_taken } = req.body;
    if (!quiz_id || !user_id || score == null || !completed_at || time_taken == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add more validation logic as needed
    next();
};

export const validateQuizTakeUpdate = (req, res, next) => {
    // Implement validation logic for quiz take updates
    // Example: check if ID is provided
    if (!req.params.id) {
        return res.status(400).json({ error: "Quiz take ID is required" });
    }
    // Add more validation logic as needed
    next();
};

export const validateLeaderboardEntryCreation = (req, res, next) => {
    const { quiz_id, user_id, score, rank } = req.body;
    if (!quiz_id || !user_id || score == null || rank == null) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add additional validation logic as needed
    next();
};

export const validateLeaderboardEntryUpdate = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Leaderboard entry ID is required" });
    }
    // Add additional validation logic as needed
    next();
};

export const validateAnalyticsCreation = (req, res, next) => {
    const { quiz_id, user_id, performance_data } = req.body;
    if (!quiz_id || !user_id || !performance_data) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Add additional validation logic as needed
    next();
};

export const validateAnalyticsUpdate = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "Analytics entry ID is required" });
    }
    // Add additional validation logic as needed
    next();
};


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const router = (0, express_1.Router)();
// Register route
router.post('/register', userController_1.registerUser);
// Login route
router.post('/login', userController_1.loginUser);
// Example of a protected route
router.get('/profile', userController_1.authenticateUser, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.body.userId });
});
// GET all users
router.get('/get', (0, errorMiddleware_1.handleErrors)(userController_1.getAllUsers));
// GET a user by ID
router.get('/get/:id', (0, errorMiddleware_1.handleErrors)(userController_1.getUserById));
// POST a new user
router.post('/create', validationMiddleware_1.validateUserCreation, (0, errorMiddleware_1.handleErrors)(userController_1.createUser));
// PUT (update) a user by ID
router.put('/update/:id', validationMiddleware_1.validateUserUpdate, (0, errorMiddleware_1.handleErrors)(userController_1.updateUserById));
// DELETE a user by ID
router.delete('/delete/:id', (0, errorMiddleware_1.handleErrors)(userController_1.deleteUserById));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
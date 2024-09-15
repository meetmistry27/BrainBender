"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getAllUsers = exports.authenticateUser = exports.loginUser = exports.registerUser = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for JWT (store in env variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await usersModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        const newUser = new usersModel_1.default({
            name,
            email,
            password_hash: passwordHash,
        });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
exports.registerUser = registerUser;
// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
exports.loginUser = loginUser;
// Middleware to check authentication
const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.body.userId = decoded.id; // Storing user id in request body
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: 'Token is not valid', error: error.message });
        }
        else {
            res.status(401).json({ message: 'Token is not valid' });
        }
    }
};
exports.authenticateUser = authenticateUser;
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel_1.default.find();
        res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
exports.getAllUsers = getAllUsers;
// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await usersModel_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
exports.getUserById = getUserById;
// Create a new user
const createUser = async (req, res) => {
    const user = new usersModel_1.default({
        name: req.body.name,
        email: req.body.email,
        password_hash: req.body.password_hash, // Ensure this is hashed securely
        google_id: req.body.google_id,
        otp: req.body.otp,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Bad request' });
        }
    }
};
exports.createUser = createUser;
// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await usersModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'Bad request' });
        }
    }
};
exports.updateUserById = updateUserById;
// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await usersModel_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};
exports.deleteUserById = deleteUserById;
//# sourceMappingURL=userController.js.map
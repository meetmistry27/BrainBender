import User, { IUser } from '../models/usersModel.ts';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password_hash: passwordHash,
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and user details including name, email, and createdAt
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
            },
            token,
        });
    } catch (error: unknown) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};


// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Middleware to check authentication
export const authenticateUser = (req: Request, res: Response, next: Function): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: 'Authorization denied, no token provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired, please login again' });
        } else {
            res.status(401).json({ message: 'Invalid token, authorization denied' });
        }
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

// Get a user by ID
export const getUserById = async (userId: string): Promise<IUser | null> => {
    try {
        const user = await User.findById(userId);
        return user; // Return the user or null
    } catch (error) {
        console.error(error);
        return null; // Handle errors and return null
    }
};
// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password_hash: req.body.password_hash, // Ensure this is hashed securely
        google_id: req.body.google_id,
        otp: req.body.otp,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Bad request' });
        }
    }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'Bad request' });
        }
    }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

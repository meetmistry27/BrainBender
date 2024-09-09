// const User = require('../models/usersModel');
import User from '../models/usersModel.js'

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user{
    const createUser = async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password_hash: req.body.password_hash, // Ensure this is hashed securely
            google_id: req.body.google_id,
            otp: req.body.otp
        });
    
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };
// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export{
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};


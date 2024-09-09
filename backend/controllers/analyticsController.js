// const Analytics = require('../models/analyticsModel');
import Analytics from "../models/analyticsModel.js";

// Get all analytics
const getAllAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.find();
        res.json(analytics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get analytics by ID
const getAnalyticsById = async (req, res) => {
    try {
        const analytic = await Analytics.findById(req.params.id);
        if (!analytic) return res.status(404).json({ message: 'Analytics not found' });
        res.json(analytic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new analytics data
const createAnalytics = async (req, res) => {
    const analytic = new Analytics({
        quiz_id: req.body.quiz_id,
        user_id: req.body.user_id,
        performance_data: req.body.performance_data
    });

    try {
        const newAnalytic = await analytic.save();
        res.status(201).json(newAnalytic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update analytics by ID
const updateAnalyticsById = async (req, res) => {
    try {
        const updatedAnalytic = await Analytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnalytic) return res.status(404).json({ message: 'Analytics not found' });
        res.json(updatedAnalytic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete analytics by ID
const deleteAnalyticsById = async (req, res) => {
    try {
        const analytic = await Analytics.findByIdAndDelete(req.params.id);
        if (!analytic) return res.status(404).json({ message: 'Analytics not found' });
        res.json({ message: 'Analytics deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllAnalytics,
    getAnalyticsById,
    createAnalytics,
    updateAnalyticsById,
    deleteAnalyticsById
};

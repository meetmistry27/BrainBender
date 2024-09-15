import { Request, Response } from 'express';
import Analytics from '../models/analyticsModel.ts';

// Get all analytics
const getAllAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const analytics = await Analytics.find();
        res.json(analytics);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Get analytics by ID
const getAnalyticsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const analytic = await Analytics.findById(req.params.id);
        if (!analytic) {
            res.status(404).json({ message: 'Analytics not found' });
            return;
        }
        res.json(analytic);
    } catch (err:any) {
        res.status(500).json({ message: err.message });
    }
};

// Create new analytics data
const createAnalytics = async (req: Request, res: Response): Promise<void> => {
    const analytic = new Analytics({
        quiz_id: req.body.quiz_id,
        user_id: req.body.user_id,
        performance_data: req.body.performance_data
    });

    try {
        const newAnalytic = await analytic.save();
        res.status(201).json(newAnalytic);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Update analytics by ID
const updateAnalyticsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedAnalytic = await Analytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnalytic) {
            res.status(404).json({ message: 'Analytics not found' });
            return;
        }
        res.json(updatedAnalytic);
    } catch (err:any) {
        res.status(400).json({ message: err.message });
    }
};

// Delete analytics by ID
const deleteAnalyticsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const analytic = await Analytics.findByIdAndDelete(req.params.id);
        if (!analytic) {
            res.status(404).json({ message: 'Analytics not found' });
            return;
        }
        res.json({ message: 'Analytics deleted' });
    } catch (err:any) {
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

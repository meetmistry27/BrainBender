import {Router} from "express";
const router = Router();
//import Analytics from '../models/analyticsModel.js';
import { getAllAnalytics } from "../controllers/analyticsController.js";
import { getAnalyticsById } from "../controllers/analyticsController.js";
import { createAnalytics } from "../controllers/analyticsController.js";
import { updateAnalyticsById } from "../controllers/analyticsController.js";
import { deleteAnalyticsById } from "../controllers/analyticsController.js";
// GET all analytics

router.get('/get', getAllAnalytics);

// GET analytics by ID
router.get('/get/:id', getAnalyticsById);

// POST new analytics data
router.post('/create', createAnalytics);

// PUT (update) analytics by ID
router.put('update/:id', updateAnalyticsById);

// DELETE analytics by ID
router.delete('/delete/:id', deleteAnalyticsById);

export default router;
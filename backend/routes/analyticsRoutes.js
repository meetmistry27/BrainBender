import { Router } from 'express';
import { 
    getAllAnalytics,
    getAnalyticsById,
    createAnalytics,
    updateAnalyticsById,
    deleteAnalyticsById
} from '../controllers/analyticsController.js';
import { validateAnalyticsCreation, validateAnalyticsUpdate } from '../middleware/validationMiddleware.js';
import { handleErrors } from '../middleware/errorMiddleware.js';

const router = Router();

// GET all analytics entries
router.get('/get', handleErrors(getAllAnalytics));

// GET an analytics entry by ID
router.get('/get/:id', handleErrors(getAnalyticsById));

// POST a new analytics entry
router.post('/create', validateAnalyticsCreation, handleErrors(createAnalytics));

// PUT (update) an analytics entry by ID
router.put('/update/:id', validateAnalyticsUpdate, handleErrors(updateAnalyticsById));

// DELETE an analytics entry by ID
router.delete('/delete/:id', handleErrors(deleteAnalyticsById));

export default router;

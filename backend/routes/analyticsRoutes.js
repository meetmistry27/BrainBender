import { Router } from 'express';
import { 
    getAllAnalyticsEntries, 
    getAnalyticsEntryById, 
    createAnalyticsEntry, 
    updateAnalyticsEntryById, 
    deleteAnalyticsEntryById 
} from '../controllers/analyticsController.js';
import { validateAnalyticsCreation, validateAnalyticsUpdate } from '../middleware/validationMiddleware.js';
import { handleErrors } from '../middleware/errorMiddleware.js';

const router = Router();

// GET all analytics entries
router.get('/get', handleErrors(getAllAnalyticsEntries));

// GET an analytics entry by ID
router.get('/get/:id', handleErrors(getAnalyticsEntryById));

// POST a new analytics entry
router.post('/create', validateAnalyticsCreation, handleErrors(createAnalyticsEntry));

// PUT (update) an analytics entry by ID
router.put('/update/:id', validateAnalyticsUpdate, handleErrors(updateAnalyticsEntryById));

// DELETE an analytics entry by ID
router.delete('/delete/:id', handleErrors(deleteAnalyticsEntryById));

export default router;

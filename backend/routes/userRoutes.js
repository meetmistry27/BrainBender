import { Router } from "express";
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById 
} from "../controllers/userController.js";
import { validateUserCreation, validateUserUpdate } from "../middleware/validationMiddleware.js";
import { handleErrors } from "../middleware/errorMiddleware.js";

const router = Router();

// GET all users
router.get('/get', handleErrors(getAllUsers));

// GET a user by ID
router.get('/get/:id', handleErrors(getUserById));

// POST a new user
router.post('/create', validateUserCreation, handleErrors(createUser)); 

// PUT (update) a user by ID
router.put('/update/:id', validateUserUpdate, handleErrors(updateUserById));

// DELETE a user by ID
router.delete('/delete/:id', handleErrors(deleteUserById));

export default router;

import { Router, Request, Response, NextFunction } from "express";
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    registerUser,
    loginUser,
    authenticateUser
} from "../controllers/userController.ts";
import { validateUserCreation, validateUserUpdate } from "../middleware/validationMiddleware.ts";
import { handleErrors } from "../middleware/errorMiddleware.ts";

const router = Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Example of a protected route
router.get('/profile', authenticateUser, (req: Request, res: Response) => {
    res.json({ message: 'This is a protected route', userId: req.body.userId });
});

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

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
import { body, validationResult } from 'express-validator';

const router = Router();

// Register route
// Registration route
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
    ],
    registerUser
);
// Login route
router.post('/login', loginUser);

// Example of a protected route
router.get('/profile', authenticateUser, async (req: Request, res: Response) => {
    try {
      const user = await getUserById(req.body.userId); // Assuming you store user ID in req.body
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
// GET all users
router.get('/get', handleErrors(getAllUsers));

// GET a user by ID
//router.get('/get/:id', handleErrors(getUserById());

// POST a new user
router.post('/create', validateUserCreation, handleErrors(createUser)); 

// PUT (update) a user by ID
router.put('/update/:id', validateUserUpdate, handleErrors(updateUserById));

// DELETE a user by ID
router.delete('/delete/:id', handleErrors(deleteUserById));

export default router;

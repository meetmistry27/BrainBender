import {Router} from "express";
//import User from '../models/usersModel.js';
import { createUser } from "../controllers/userController.js";
import { getAllUsers } from "../controllers/userController.js";
import { getUserById } from "../controllers/userController.js";
import { updateUserById } from "../controllers/userController.js";
import { deleteUserById } from "../controllers/userController.js";
const router = Router();

// GET all users
router.get('/get', getAllUsers);

// GET a user by ID
router.get('/get/:id', getUserById);

// POST a new user
router.post('/create', createUser); 

// PUT (update) a user by ID
router.put('/update/:id', updateUserById);

// DELETE a user by ID
router.delete('/delete/:id', deleteUserById);

export default router;

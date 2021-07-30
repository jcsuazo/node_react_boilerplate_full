import express, { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';
import advancedResults from '../middleware/advancedResults';
import User from '../models/userModel';

const router = express.Router();

// router.route('/').get(userController);
router.route('/').get(advancedResults(User), getUsers).post(createUser);

export default router;

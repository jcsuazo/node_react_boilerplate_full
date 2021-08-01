import express, { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  seedUsers,
} from '../controllers/userController';
import advancedResults from '../middleware/advancedResults';
import User from '../models/userModel';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();
router.route('/seeder').get(seedUsers);
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;

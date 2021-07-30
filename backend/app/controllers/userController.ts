import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../../helper/utils/generateToken';
import { Request, Response, NextFunction } from 'express';

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Create user
// @route     POST /api/v1/users
// @access    Private/Admin
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

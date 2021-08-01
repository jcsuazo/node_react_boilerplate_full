import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
// import generateToken from '../../helper/utils/generateToken';
import { Request, Response } from 'express';
import fs from 'fs';

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Private/Admin
export const getUsers = asyncHandler(async (_: Request, res: Response) => {
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

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Private/Admin
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      seed users
// @route     DELETE /api/v1/users/seeder
// @access    Public
export const seedUsers = asyncHandler(async (_: Request, res: Response) => {
  const users = JSON.parse(
    fs.readFileSync(
      `/Users/applab/learning/node/node_react_boilerplate_full/backend/_data/users.json`,
      'utf-8',
    ),
    // fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
  );
  await User.deleteMany();
  console.log(users);
  await User.create(users);

  res.status(200).json({
    success: true,
    data: {},
  });
});

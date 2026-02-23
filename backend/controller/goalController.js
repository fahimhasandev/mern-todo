import asyncHandler from 'express-async-handler';
import GoalModel from '../models/goalModel.js';
import UserModel from '../models/userModel.js';

// @desc     Get Goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
	// get specific goals
	const goals = await GoalModel.find({ user: req.user.id });

	res.status(200).json(goals);
});

// @desc     Get Single Goal
// @route    GET /api/goals/:id
// @access   Private
const getSingleGoal = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Get SIngle Goal ${req.params.id}` });
});

// @desc     Set Goals
// @route    POST /api/goals
// @access   Private
const setGoals = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	const goal = await GoalModel.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(goal);
});

// @desc     Update Goals
// @route    PUT /api/goals/:id
// @access   Private
const updateGoals = asyncHandler(async (req, res) => {
	const goal = await GoalModel.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error(`Goal Not Found`);
	}
	// check user
	const user = await UserModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User Not Found');
	}

	// make sure the logged in user matches the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	//update goals
	const updatedGoals = await GoalModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoals);
});

// @desc     Delete Goals
// @route    Delete /api/goals/:id
// @access   Private
const deleteGoals = asyncHandler(async (req, res) => {
	const goal = await GoalModel.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error(`Goal Not Found`);
	}

	// check user
	const user = await UserModel.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User Not Found');
	}

	// make sure the logged in user matches the goal user
	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	//delete
	await GoalModel.findByIdAndDelete(goal);
	res.status(200).json({
		message: 'User deleted:',
	});
});

export const goalsController = {
	getGoals,
	setGoals,
	updateGoals,
	deleteGoals,
	getSingleGoal,
};

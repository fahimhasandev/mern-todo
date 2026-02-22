import asyncHandler from 'express-async-handler';
import GoalModel from '../models/goalModel.js';

// @desc     Get Goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await GoalModel.find();

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

	const goal = await GoalModel.insertOne({
		text: req.body.text,
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

	//delete
	const deletedGoals = await GoalModel.deleteOne(goal);
	res.status(200).json(deleteGoals);
});

export const goalsController = {
	getGoals,
	setGoals,
	updateGoals,
	deleteGoals,
	getSingleGoal,
};

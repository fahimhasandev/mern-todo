import asyncHandler from 'express-async-handler';

// @desc     Get Goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get Goals' });
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

	res.status(200).json({
		message: 'Set Goals',
	});
});

// @desc     Update Goals
// @route    PUT /api/goals/:id
// @access   Private
const updateGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Update Goals ${req.params.id}`,
	});
});

// @desc     Delete Goals
// @route    Delete /api/goals/:id
// @access   Private
const deleteGoals = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Delete Goals' });
});

export const goalsController = {
	getGoals,
	setGoals,
	updateGoals,
	deleteGoals,
	getSingleGoal,
};

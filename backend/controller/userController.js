import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';

// @desc     Register New user
// @route    POST /api/users
// @access   Public
const register = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	//  if they are empty...send error
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please all field');
	}

	//Check if user exists
	const userExists = await UserModel.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Has Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await UserModel.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid User Data');
	}
});

// @desc     Authenticate a user
// @route    POST /api/users/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check for user email
	const user = await UserModel.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc     GET user data
// @route    GET /api/users/me
// @access   private
const getMe = asyncHandler(async (req, res) => {
	const { _id, name, email } = await UserModel.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
	});
});

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

export const userController = {
	register,
	loginUser,
	getMe,
};

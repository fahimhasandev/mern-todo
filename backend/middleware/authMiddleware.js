import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;
	// 1. check the authorization header
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			//Get Token from header
			token = req.headers.authorization.split(' ')[1];

			//Varify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get the user from the token -- insert
			req.user = await UserModel.findById(decoded.id).select('-password');

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not Authorized, no token');
	}
});

export default protect;

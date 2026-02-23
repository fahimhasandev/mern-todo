import express from 'express';
import { goalRoutes } from './routes/goalRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { userRoutes } from './routes/userRoutes.js';
const port = process.env.PORT || 5001;
dotenv.config();

// Connection DB
connectDB();
const app = express();

// access json body post data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

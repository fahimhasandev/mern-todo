import express from 'express';
import { goalRoutes } from './routes/goalRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
// import { config } from 'dotenv';
const port = process.env.PORT || 5001;

const app = express();

// access json body post data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

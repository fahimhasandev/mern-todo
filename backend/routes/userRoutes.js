import { Router } from 'express';
import { userController } from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', userController.register);
router.post('/login', userController.loginUser);
router.get('/me', protect, userController.getMe);

export const userRoutes = router;

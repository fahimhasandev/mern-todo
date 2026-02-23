import { Router } from 'express';
import { goalsController } from '../controller/goalController.js';
import protect from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(protect, goalsController.getGoals).post(protect, goalsController.setGoals);
router
	.route('/:id')
	.delete(protect, goalsController.deleteGoals)
	.put(protect, goalsController.updateGoals)
	.get(protect, goalsController.getSingleGoal);

// router.get('/', goalsController.getGoals);
// router.get('/:id', goalsController.getSingleGoal);
// router.post('/', goalsController.setGoals);
// router.put('/:id', goalsController.updateGoals);
// router.delete('/:id', goalsController.deleteGoals);

export const goalRoutes = router;

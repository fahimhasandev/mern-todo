import { Router } from 'express';
import { goalsController } from '../controller/goalController.js';

const router = Router();

router.route('/').get(goalsController.getGoals).post(goalsController.setGoals);
router
	.route('/:id')
	.delete(goalsController.deleteGoals)
	.put(goalsController.updateGoals)
	.get(goalsController.getSingleGoal);

// router.get('/', goalsController.getGoals);
// router.get('/:id', goalsController.getSingleGoal);
// router.post('/', goalsController.setGoals);
// router.put('/:id', goalsController.updateGoals);
// router.delete('/:id', goalsController.deleteGoals);

export const goalRoutes = router;

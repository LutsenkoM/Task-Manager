import {Router} from 'express';
import {authenticate, authorize} from "../middlewares/auth.middleware";
import {createTask, deleteTask, editTask, getTasks} from "../controllers/tasks.controller";

const router = Router();

router.get('/', authenticate, getTasks);
router.post('/', authenticate, createTask);
router.put('/:id', authenticate, authorize(['admin', 'user']), editTask);
router.delete('/:id', authenticate, authorize(['admin', 'user']), deleteTask);
export default router;
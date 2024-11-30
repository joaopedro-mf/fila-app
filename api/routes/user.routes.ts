import { Router } from 'express';
import { UserController  } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post("/users", userController.createUser.bind(userController));
router.get("/users/:id", userController.getUser.bind(userController));
router.get("/", userController.getUsers.bind(userController));


export default router;
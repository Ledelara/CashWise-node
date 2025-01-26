import express from 'express';
import { register, login, editUser, excludeUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/user/:id', editUser);
router.delete('/user/:id', excludeUser);

export default router;
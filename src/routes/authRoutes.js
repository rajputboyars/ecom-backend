import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister, validateLogin, validateRequest } from '../middlewares/validateRequest.js';

const router = express.Router();

// User registration route
router.post('/register', validateRegister(), validateRequest, register);

// User login route
router.post('/login', validateLogin(), validateRequest, login);

export default router;

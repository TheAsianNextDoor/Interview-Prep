import express from 'express';

import { login, signup } from '../controllers/auth';

export const authRouter = express.Router();

authRouter.get('/login', login);
authRouter.post('/signup', signup);

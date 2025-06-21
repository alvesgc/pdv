import express from 'express';
import { finishRegistration } from '../api/register.js';

const router = express.Router();

router.post('/', finishRegistration);

export default router;

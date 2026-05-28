import express from 'express';
import {signin, signup} from '#controllers/auth.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello from User API router...');
});

router.post('/signup', signup);
router.post('/signin', signin);

export default router;

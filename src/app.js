import express from 'express';
import cors from 'cors';
import authRouter from '#routes/auth.router';
import { errorHandler } from '#middleware/errorHandler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello from API');
});

//API health check
app.get('/health', (req, res) => {
  return res.status(200).send({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

//Routes
app.use('/api/auth', authRouter);

app.use(errorHandler);

export default app;

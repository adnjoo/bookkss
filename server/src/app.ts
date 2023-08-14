import cors from 'cors';
import express, { Request, Response } from 'express';

import { reviewRouter } from './routes/reviewRoutes';
import { userRouter } from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/reviews', reviewRouter);

app.use('/users', userRouter);

export { app };

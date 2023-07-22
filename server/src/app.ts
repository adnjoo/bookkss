import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { reviewRouter } from './routes/reviewRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/reviews', reviewRouter);

export { app };

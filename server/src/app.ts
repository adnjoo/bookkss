import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';

import { authMiddleWare } from './auth/authMiddleware';
import { reviewRouter } from './routes/reviewRoutes';
import { passport } from './auth/passportConfig';

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleWare);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/reviews', reviewRouter);

export { app };

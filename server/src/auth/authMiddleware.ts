import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = Router();

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  req.user ? next() : res.sendStatus(401);
};

// Routes
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/protected', isLoggedIn, (req: any, res: any) => {
  res.send(`Hello ${req.user.displayName}`);
});

export { router as authMiddleWare };

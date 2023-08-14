import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = Router();

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  req.user ? next() : res.sendStatus(401);
};

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

router.get('/isauth', isLoggedIn, (req: any, res: any) => {
  res.send({
    id: req.user.id,
    displayName: req.user.displayName,
    email: req.user.email,
    picture: req.user.picture,
  });
});

export { router as authMiddleWare };

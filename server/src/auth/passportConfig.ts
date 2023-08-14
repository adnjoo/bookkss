import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import { pool } from '../db';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      passReqToCallback: true,
    },
    function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      const { id, displayName, email } = profile;
      // console.log('profile', profile);
      pool.query(
        `
        INSERT INTO "User" (id, email, username)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO NOTHING
        `,
        [id, email, displayName],
        (error: any, result: any) => {
          if (error) {
            console.error(
              'Error inserting user into PostgreSQL database:',
              error
            );
            return;
          }
        }
      );
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

export { passport };

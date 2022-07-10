import type { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'LASTFM_COLLAGE_SESSION_COOKIE',
  ttl: 0,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

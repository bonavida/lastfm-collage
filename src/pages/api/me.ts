import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
/** Services */
import { getSession } from '@services/auth';
import { getUser } from '@services/lastfm';
/** Constants */
import { sessionOptions } from '@constants/session';
/** Types */
import { User } from '@customTypes/auth';

type Data = {
  user: User | null;
};

async function me(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token } = req.query;
  try {
    const session = await getSession(token as string);
    const { key } = session ?? {};
    const user = await getUser(key);
    req.session.user = user;
    req.session.sessionKey = key;
    req.session.token = token as string;
    await req.session.save();
    res.redirect('/');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ user: null });
  }
}

console.log(sessionOptions);
export default withIronSessionApiRoute(me, sessionOptions);

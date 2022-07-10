import type { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
/** Services */
import { getSession } from '@services/auth';
import { getUser } from '@services/lastfm';
/** Constants */
import { sessionOptions } from '@constants/session';

async function me(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;
  try {
    if (req.session.user) {
      res.status(200).json(req.session.user);
      return;
    }
    const session = await getSession(token as string);
    const { key } = session ?? {};
    const user = await getUser(key);
    req.session.user = user;
    req.session.sessionKey = key;
    req.session.token = token as string;
    await req.session.save();
    res.json({ user });
  } catch (error) {
    res.status(500).json({ user: null });
  }
}

export default withIronSessionApiRoute(me, sessionOptions);

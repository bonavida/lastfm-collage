import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
/** Constants */
import { sessionOptions } from '@constants/session';

function logout(req: NextApiRequest, res: NextApiResponse<void>) {
  req.session.destroy();
  res.json();
}

export default withIronSessionApiRoute(logout, sessionOptions);

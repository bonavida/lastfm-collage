import type { NextApiRequest, NextApiResponse } from 'next';
/** Services */
import { getSession } from '@services/auth';
import { getUser } from '@services/lastfm';
/** Types */
import { User } from '@customTypes/auth';

type Data = {
  user: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { token = '' } = req.query;
  try {
    const session = await getSession(token as string);
    const { key } = session ?? {};
    const user = await getUser(key);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ user: null });
  }
}

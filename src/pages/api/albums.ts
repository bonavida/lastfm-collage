import type { NextApiRequest, NextApiResponse } from 'next';
/** Services */
import { getUserTopAlbums } from '@services/lastfm';
/** Types */
import { Album } from '@customTypes/album';

interface Data {
  albums: Album[];
}

const albumsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { username, sessionKey, filters } = await req.body;
  try {
    const topAlbums = await getUserTopAlbums(username, sessionKey, filters);
    res.json({ albums: topAlbums });
  } catch (error) {
    res.status(500).json({ albums: [] });
  }
};

export default albumsHandler;

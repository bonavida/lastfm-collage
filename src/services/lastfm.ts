/** Utils */
import { generateApiSignature, getLargestImage } from '@utils/lastfm';
/** Constants */
import { LASTFM_API_KEY, LASTFM_API_URL } from '@constants/lastfm';
/** Types */
import { ResponseUser } from '@customTypes/lastfm';
import { User } from '@customTypes/auth';

export const getUser = async (sessionKey: string): Promise<User> => {
  const authParams = {
    method: 'user.getinfo',
    api_key: LASTFM_API_KEY,
    sk: sessionKey,
  };
  const apiSignature = generateApiSignature(authParams);
  const params = {
    ...authParams,
    api_sig: apiSignature,
    format: 'json',
  };
  const url = `${LASTFM_API_URL}?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const { user } = await response.json();
  const { name, realname, url: userUrl, image } = user as ResponseUser;
  const largestImage = getLargestImage(image);
  return {
    id: name,
    username: name,
    name: realname,
    url: userUrl,
    avatar: largestImage['#text'],
  } as User;
};

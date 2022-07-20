/** Utils */
import {
  generateApiSignature,
  getLargestImage,
  parseTopAlbums,
} from '@utils/lastfm';
import { shuffleArray } from '@utils/common';
/** Constants */
import { LASTFM_API_KEY, LASTFM_API_URL } from '@constants/lastfm';
/** Types */
import {
  ParamFilters,
  Filters,
  ResponseTopAlbums,
  ResponseUser,
} from '@customTypes/lastfm';
import { User } from '@customTypes/auth';
import { Album } from '@customTypes/album';

interface UserJSONResponse {
  user: ResponseUser;
  errors?: Array<{ message: string }>;
}

interface TopAlbumsJSONResponse {
  topalbums: ResponseTopAlbums;
  errors?: Array<{ message: string }>;
}

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
  const { user }: UserJSONResponse = await response.json();
  const { name, realname, url: userUrl, image } = user;
  const largestImage = getLargestImage(image) ?? {};
  return {
    id: name,
    username: name,
    name: realname,
    url: userUrl,
    avatar: largestImage['#text'],
  } as User;
};

const getPaginatedUserTopAlbums = async (
  username: string,
  sessionKey: string,
  filters: ParamFilters
): Promise<ResponseTopAlbums> => {
  const signatureParams = {
    user: username,
    api_key: LASTFM_API_KEY,
    sk: sessionKey,
    ...filters,
  };
  const apiSignature = generateApiSignature(signatureParams);
  const params = {
    ...signatureParams,
    api_sig: apiSignature,
    format: 'json',
  };
  const url = `${LASTFM_API_URL}?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  const { topalbums }: TopAlbumsJSONResponse = await response.json();
  return topalbums;
};

export const getUserTopAlbums = async (
  username: string,
  sessionKey: string,
  { limit, shuffle, skipDuplicates, ...filters }: Filters
): Promise<Album[]> => {
  const albums: Album[] = [];
  const currentFilters = {
    ...filters,
    limit: `${limit}`,
    page: '1',
  };
  do {
    const remaining = limit - albums.length;
    const { album: topalbums, ['@attr']: attr } =
      await getPaginatedUserTopAlbums(username, sessionKey, currentFilters);
    const filteredAlbums = parseTopAlbums(topalbums, skipDuplicates).slice(
      0,
      remaining
    );
    albums.push(...filteredAlbums);
    if (parseInt(attr.total, 10) < limit) break;
    currentFilters.page = `${parseInt(currentFilters.page, 10) + 1}`;
  } while (albums.length < limit);
  return shuffle ? shuffleArray(albums) : albums;
};

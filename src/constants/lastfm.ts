/** Types */
import { ImageWeightMapper } from '@customTypes/lastfm';

export const LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0';
export const LASTFM_AUTH_URL = 'https://www.last.fm/api/auth';
export const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY ?? '';
export const LASTFM_SHARED_SECRET =
  process.env.NEXT_PUBLIC_LASTFM_SHARED_SECRET ?? '';
export const LASTFM_CALLBACK_URL =
  process.env.NEXT_PUBLIC_LASTFM_CALLBACK_URL ?? 'http://localhost:3000/signin';

export const IMAGE_WEIGHT_MAPPER: ImageWeightMapper = {
  small: 0,
  medium: 1,
  large: 2,
  extralarge: 3,
};

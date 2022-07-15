/** Types */
import { ImageWeightMapper } from '@customTypes/lastfm';
import { SelectOption } from '@customTypes/common';

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

export const LASTFM_METHODS: Array<SelectOption> = [
  { id: 'user.gettopalbums', name: 'Top albums' },
  {
    id: 'user.getTopArtists',
    name: 'Top artists',
    disabled: true,
  },
  {
    id: 'artist.getTopTracks',
    name: 'Top tracks',
    disabled: true,
  },
];

export const LASTFM_PERIODS: Array<SelectOption> = [
  { id: 'overall', name: 'Overall' },
  {
    id: '7day',
    name: '7 days',
  },
  {
    id: '1month',
    name: '1 month',
  },
];

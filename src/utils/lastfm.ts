/** Utils */
import { generateMd5Hash } from '@utils/common';
/** Types */
import { Image, ResponseAlbum } from '@customTypes/lastfm';
import { Album } from '@customTypes/album';
/** Constants */
import { LASTFM_SHARED_SECRET, IMAGE_WEIGHT_MAPPER } from '@constants/lastfm';

/**
 * Retrieves the last.fm token from the URL query params
 * @param searchLocation String with the URL query params
 */
export const retrieveLastfmToken = (searchLocation: string) => {
  const searchParams = new URLSearchParams(searchLocation);
  return searchParams.get('token');
};

/**
 * Sign your authenticated calls by first ordering the parameters sent in your call
 * alphabetically by parameter name and concatenating them into one string using
 * a <name><value> scheme. You must not include the format and callback parameters.
 *
 * Then append your secret to this string. Finally, generate an md5 hash of the resulting string.
 */
export const generateApiSignature = (
  params: Record<string, string | number | undefined>
) => {
  const paramKeysSig = Object.keys(params)
    .sort()
    .reduce((acc: string, key: string) => `${acc}${key}${params[key]}`, '');
  const partialApiSig = `${paramKeysSig}${LASTFM_SHARED_SECRET}`;
  return generateMd5Hash(partialApiSig);
};

export const getLargestImage = (images: Image[] = []) =>
  images.reduce(
    (prev: Image, curr: Image) =>
      IMAGE_WEIGHT_MAPPER[prev.size] > IMAGE_WEIGHT_MAPPER[curr.size]
        ? prev
        : curr,
    {} as Image
  );

export const parseTopAlbums = (albums: ResponseAlbum[]): Album[] =>
  albums
    .map((album: ResponseAlbum) => ({
      ...album,
      artist: album.artist?.name,
      image: getLargestImage(album.image)['#text'] || '',
    }))
    .filter((album: Album) => album.image);

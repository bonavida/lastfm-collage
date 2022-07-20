/** Constants */
import { LASTFM_SHARED_SECRET, IMAGE_WEIGHT_MAPPER } from '@constants/lastfm';
/** Utils */
import { generateMd5Hash } from '@utils/common';
/** Types */
import { Image, ResponseAlbum } from '@customTypes/lastfm';
import { Album } from '@customTypes/album';

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

export const parseTopAlbums = (
  albums: ResponseAlbum[],
  skipDuplicates: boolean = false
): Album[] =>
  albums
    .map(
      ({
        mbid: id,
        name,
        artist,
        image,
        playcount: playCount,
        url,
      }: ResponseAlbum) => ({
        id,
        name,
        artist: artist?.name ?? 'Unknown Artist',
        image: (getLargestImage(image) ?? {})['#text'] ?? '',
        playCount: parseInt(playCount, 10),
        url,
      })
    )
    .filter(
      ({ image, url }: Album) =>
        image && (!skipDuplicates || !url.includes('+noredirect'))
    );

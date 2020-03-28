import * as crypto from 'crypto';
/** Config */
import { lastfm } from 'config';
/** Types */
import { Image } from 'models/lastfm';

const imageWeight: Record<string, number> = {
  small: 0,
  medium: 1,
  large: 2,
  extralarge: 3,
};

/**
 * Retrieves the last.fm token from the URL query params
 * @param searchLocation String with the URL query params
 */
export const retrieveLastfmToken = (searchLocation: string) => {
  const searchParams = new URLSearchParams(searchLocation);
  return searchParams.get('token');
};

/**
 * Generates a md5 hash from a string
 * @param contents
 */
export const md5 = (contents: string) =>
  crypto
    .createHash('md5')
    .update(contents)
    .digest('hex');

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
  const {
    auth: { sharedSecret },
  } = lastfm;
  const paramKeysSig = Object.keys(params)
    .sort()
    .reduce((acc: string, key: string) => `${acc}${key}${params[key]}`, '');
  const partialApiSig = `${paramKeysSig}${sharedSecret}`;
  return md5(partialApiSig);
};

export const getLargestImage = (images: Image[] = []) =>
  images.reduce(
    (prev: Image, curr: Image) =>
      imageWeight[prev.size] > imageWeight[curr.size] ? prev : curr,
    {} as Image
  );

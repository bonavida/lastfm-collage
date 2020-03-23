import * as crypto from 'crypto';
import { lastfm } from 'config';

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
 * So for a call to auth.getSession you may have:
 *        api_keyxxxxxxxxxxmethodauth.getSessiontokenyyyyyy
 * Then append your secret to this string. Finally, generate an md5 hash of the resulting string.
 */
export const generateApiSignature = (token: string) => {
  const {
    auth: { apiKey, sharedSecret },
  } = lastfm;
  const partialApiSig = `api_key${apiKey}methodauth.getSessiontoken${token}${sharedSecret}`;
  return md5(partialApiSig);
};

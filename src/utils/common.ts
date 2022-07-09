import * as crypto from 'crypto';

/**
 * Generates a md5 hash from a string
 * @param contents
 */
export const generateMd5Hash = (contents: string) =>
  crypto.createHash('md5').update(contents).digest('hex');

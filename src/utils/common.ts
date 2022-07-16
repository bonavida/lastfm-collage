import * as crypto from 'crypto';

/**
 * Generates a md5 hash from a string
 * @param contents
 */
export const generateMd5Hash = (contents: string) =>
  crypto.createHash('md5').update(contents).digest('hex');

/**
 * Retrieves the last.fm token from the URL query params
 * @param searchLocation String with the URL query params
 */
export const retrieveLastfmToken = (searchLocation: string) => {
  const searchParams = new URLSearchParams(searchLocation);
  const token = searchParams.get('token');
  searchParams.delete('token');
  return token;
};

/**
 * Shuffles an array of items
 * @param array Array to be shuffled
 * @returns Shuffled array
 */
export const shuffleArray = (array: Array<any>): Array<any> => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

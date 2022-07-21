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

/**
 * Load image from a url
 * @param url String with the image URL to be loaded
 * @returns Promise with the image object
 */
export const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = '*';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Load ${url} fail`));
    img.src = url;
  });

/**
 * Get base64 encoded image from a canvas
 * @param canvas Canvas to be drawn on
 * @param quality Quality of the image
 * @returns {string} Base64 encoded image
 */
export const getImageFromCanvas = (
  canvas: HTMLCanvasElement | null,
  quality: number
) => canvas?.toDataURL('image/png', quality);

/**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} newWidth - The width of the image in pixels
 * @param {Number} newHeight - The height of the image in pixels
 */
export const resizeBase64Img = (
  base64: string,
  newWidth: number,
  newHeight: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const context = canvas.getContext('2d');
    const img = document.createElement('img');
    img.src = base64;
    img.onload = () => {
      context?.scale(newWidth / img.width, newHeight / img.height);
      context?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL());
    };
  });
};

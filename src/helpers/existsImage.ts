/* eslint-disable array-callback-return*/
import { ENDPOINT_IMAGES } from '../constants/urls';

const IMAGE_NOT_FOUND =
  'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

export const existsImage = (movie) => {
  const neededKeys = ['poster_path', 'backdrop_path', 'poster_path'];
  let keyActive: any = null;
  neededKeys.some((key) => {
    const isExistKey = movie && Object.keys(movie).includes(key) && movie[key];
    if (isExistKey) {
      keyActive = key;
    }
  });
  return keyActive !== null
    ? `${ENDPOINT_IMAGES}${movie[keyActive]}`
    : IMAGE_NOT_FOUND;
};

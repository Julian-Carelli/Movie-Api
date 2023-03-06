/* eslint-disable array-callback-return*/
import { ENDPOINT_IMAGES } from '../constants/urls';
import { IResponseDetail } from '../types';

const IMAGE_NOT_FOUND =
  'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

export const existsImage = (movie: IResponseDetail) => {
  const neededKeys = ['poster_path', 'backdrop_path', 'poster_path'];
  let keyActive: string | null = null;
  neededKeys.some((key) => {
    const isExistKey =
      movie &&
      Object.keys(movie).includes(key) &&
      movie[key as keyof typeof movie];
    if (isExistKey) {
      keyActive = key;
    }
  });
  return keyActive !== null
    ? `${ENDPOINT_IMAGES}${movie[keyActive as keyof typeof movie]}`
    : IMAGE_NOT_FOUND;
};

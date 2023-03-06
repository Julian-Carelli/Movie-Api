import { IGender, IResponseDetail, TGenderList } from '../types';

/* eslint-disable array-callback-return*/
const foundGenders = (
  movie: IResponseDetail,
  genderList: TGenderList,
  foundedGenders: string[],
  isDetail: boolean
) => {
  try {
    const genresIdsInDetail: number[] = movie?.genre_ids
      ? movie?.genre_ids
      : [];
    const genresIdsInHome: IGender[] = movie?.genres ? movie?.genres : [];
    if (!isDetail) {
      return genresIdsInDetail.map((id) => {
        genderList?.genres.map((gender: IGender) => {
          if (gender.id === id) {
            const { name } = gender;
            foundedGenders.push(name);
          }
        });
      });
    }
    return genresIdsInHome.map((genderDetail) => {
      genderList?.genres.map((gender: IGender) => {
        if (gender.id === genderDetail.id) {
          const { name } = gender;
          foundedGenders.push(name);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const gendersName = (
  genderList: {
    genderSeries: TGenderList;
    genderMovies: TGenderList;
  },
  contentType: string,
  movie: IResponseDetail,
  isDetail: boolean
) => {
  if (!movie) {
    return [];
  }
  const { genderSeries, genderMovies } = genderList;
  const foundedGenders: string[] = [];
  if (contentType === 'movie') {
    foundGenders(movie, genderMovies, foundedGenders, isDetail);
    movie['gender_name'] = foundedGenders;
    return foundedGenders;
  }
  foundGenders(movie, genderSeries, foundedGenders, isDetail);
  movie['gender_name'] = foundedGenders;
  return foundedGenders;
};

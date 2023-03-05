/* eslint-disable array-callback-return*/
const foundGenders = (movie, genderList, foundedGenders, isDetail) => {
  try {
    const genresIds =
      movie?.genres || movie?.genre_ids
        ? movie?.genres || movie?.genre_ids
        : [];
    if (!isDetail) {
      return genresIds.map((id) => {
        genderList?.genres.map((gender: any) => {
          if (gender.id === id) {
            const { name } = gender;
            foundedGenders.push(name);
          }
        });
      });
    }
    return genresIds.map((genderDetail) => {
      genderList?.genres.map((gender: any) => {
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
  genderList: any,
  contentType: any,
  movie: any,
  isDetail: any
) => {
  if (!movie) {
    return [];
  }
  const { genderSeries, genderMovies } = genderList;
  const foundedGenders: any = [];
  if (contentType === 'movie') {
    foundGenders(movie, genderMovies, foundedGenders, isDetail);
    movie['gender_name'] = foundedGenders;
    return foundedGenders;
  }
  foundGenders(movie, genderSeries, foundedGenders, isDetail);
  movie['gender_name'] = foundedGenders;
  return foundedGenders;
};

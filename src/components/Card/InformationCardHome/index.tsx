/* eslint-disable array-callback-return*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ENDPOINT_IMAGES } from '../../../constants/urls';

const IMAGE_NOT_FOUND =
  'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

const isFavorite = (content, favorites) => {
  return favorites.some((favorite) => favorite.id === content.id);
};
const existsImage = (movie) => {
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

const gendersName = (
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

const InformationCardHome = ({
  movie,
  contentTypeCustom,
  goToPageDetail,
  genderList,
  contentType,
  value,
  showIconHeart,
  isFavoriteSection,
  isDetail,
}) => (
  <div>
    <div className="Card__image">
      <img
        onClick={() => goToPageDetail(movie, contentTypeCustom)}
        src={existsImage(movie)}
        alt={movie?.name}
        style={{
          width: '300px',
          cursor: 'pointer',
          height: '400px',
          borderRadius: '10px',
        }}
      />
    </div>
    <div className="Card__information">
      <div className="Card__presentation">
        {!isDetail && (
          <h4 style={{ margin: '0' }}>{movie?.title || movie?.name}</h4>
        )}
      </div>
      <div className={'Card__genders ' + (isDetail && 'Card__genders--detail')}>
        {movie && movie.gender_name
          ? movie.gender_name.map((name) => (
              <p className="Card__gender">{name}</p>
            ))
          : gendersName(genderList, contentType, movie, isDetail).map(
              (nameGender) => <p className="Card__gender">{nameGender}</p>
            )}
      </div>
    </div>
    {showIconHeart && (
      <div className="Card__actions">
        <div
          className={
            'Card__action action__heart ' +
            (isFavoriteSection || isFavorite(movie, value.favorites)
              ? 'action__heart--red'
              : '')
          }
        >
          <FontAwesomeIcon
            icon={faHeart}
            onClick={
              isFavoriteSection
                ? () => value.actions.deleteToFavorites(movie)
                : () => value.actions.addToFavorites(movie)
            }
          />
        </div>
      </div>
    )}
  </div>
);

export { InformationCardHome };

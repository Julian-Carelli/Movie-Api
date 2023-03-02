/* eslint-disable array-callback-return*/
import { useContext } from 'react';
import { MovieContext } from '../../context/movieContextProvider';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT_IMAGES } from '../../constants/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const IMAGE_NOT_FOUND =
  'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

interface Iprops {
  movie: any;
  contentType?: any;
  isFavoriteSection: boolean;
  showIconHeart: boolean;
}

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

const foundGenders = (movie, genderList, foundedGenders) => {
  try {
    const genresIds =
      movie & movie?.genres || movie?.genre_ids
        ? movie?.genres || movie?.genre_ids
        : [];
    genresIds.map((id) => {
      genderList?.genres.map((gender: any) => {
        if (gender.id === id) {
          const { name } = gender;
          foundedGenders.push(name);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const gendersName = (genderList: any, contentType: any, movie: any) => {
  if (!movie) {
    return [];
  }
  const { genderSeries, genderMovies } = genderList;
  const foundedGenders: any = [];
  if (contentType === 'movie') {
    foundGenders(movie, genderMovies, foundedGenders);
    movie['gender_name'] = foundedGenders;
    return foundedGenders;
  }
  foundGenders(movie, genderSeries, foundedGenders);
  movie['gender_name'] = foundedGenders;
  return foundedGenders;
};

const isFavorite = (content, favorites) => {
  return favorites.some((favorite) => favorite.id === content.id);
};

const Card = (props: Iprops) => {
  const { movie, contentType, isFavoriteSection, showIconHeart } = props;
  const value: any = useContext(MovieContext);
  const navigate = useNavigate();
  const contentTypeCustom = movie?.media_type ? movie?.media_type : contentType;

  const genderList = {
    genderSeries: value?.genderSeries,
    genderMovies: value?.genderMovies,
  };

  const haveMediaType = movie && 'media_type' in movie;
  if (!haveMediaType && movie) {
    movie['media_type'] = contentTypeCustom;
  }

  const goToPageDetail = (movie, contentTypeCustom) => {
    const obj = {
      content: movie,
      contentType: contentTypeCustom,
    };
    value.actions.selectCurrentContent(obj);
    return navigate('/' + contentTypeCustom + '/' + movie.id);
  };

  return (
    <div className="Card" key={movie?.id} style={{ padding: '0px 40px' }}>
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
          <h4 style={{ margin: '0' }}>{movie?.title || movie?.name}</h4>
        </div>
        <div className="Card__genders">
          <strong>Generos: </strong>
          {movie && movie.gender_name
            ? movie.gender_name.map((name) => (
                <p className="Card__gender">{name}</p>
              ))
            : gendersName(genderList, contentType, movie).map((nameGender) => (
                <p className="Card__gender">{nameGender}</p>
              ))}
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
};

export { Card };

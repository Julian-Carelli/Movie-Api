/* eslint-disable array-callback-return*/
import { useContext } from 'react';
import { MovieContext } from '../../context/movieContextProvider';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT_IMAGES } from '../../constants/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const IMAGE_NOT_FOUND =
  'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

interface Iprops {
  movie: any;
  contentType?: any;
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

const Card = (props: Iprops) => {
  const { movie, contentType } = props;
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
        <div>
          <h4>{movie?.title}</h4>
        </div>
      </div>
      <div className="Card__action" style={{ display: 'flex' }}>
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => value.actions.deleteToFavorites(movie)}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ marginLeft: '20px' }}
            onClick={() => value.actions.addToFavorites(movie)}
          />
        </div>
        <div>
          {movie && movie.gender_name
            ? movie.gender_name.map((name) => <p>{name}</p>)
            : gendersName(genderList, contentType, movie).map((nameGender) => (
                <p>{nameGender}</p>
              ))}
        </div>
      </div>
    </div>
  );
};

export { Card };

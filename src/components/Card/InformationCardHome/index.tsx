import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { gendersName } from '../../../helpers/gendersName';
import { existsImage } from '../../../helpers/existsImage';

const isFavorite = (content, favorites) => {
  return favorites.some((favorite) => favorite.id === content.id);
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
  <div className="Information-card-home">
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

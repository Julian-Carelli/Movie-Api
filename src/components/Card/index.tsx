/* eslint-disable array-callback-return*/
import { useContext } from 'react';
import { MovieContext } from '../../context/movieContextProvider';
import { useNavigate } from 'react-router-dom';
import { InformationCardHome } from './InformationCardHome';
import { InformationCardDetail } from './InformationCardDetail';

interface Iprops {
  movie: any;
  contentType?: any;
  isFavoriteSection: boolean;
  showIconHeart: boolean;
  isDetail: boolean;
}

const Card = (props: Iprops) => {
  const { movie, contentType, isFavoriteSection, showIconHeart, isDetail } =
    props;
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
    return navigate('/' + contentTypeCustom + '/' + movie.id);
  };

  const propsToInformationCardHome = {
    movie,
    contentTypeCustom,
    goToPageDetail,
    genderList,
    contentType,
    value,
    showIconHeart,
    isFavoriteSection,
    isDetail,
  };

  return (
    <div
      className={'Card ' + (isDetail && 'Card__detail')}
      key={movie?.id}
      style={{ padding: '0px 40px' }}
    >
      <InformationCardHome {...propsToInformationCardHome} />
      {isDetail && <InformationCardDetail movie={movie} />}
    </div>
  );
};

export { Card };

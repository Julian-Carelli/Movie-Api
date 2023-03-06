/* eslint-disable array-callback-return*/
import { useNavigate } from 'react-router-dom';
import { InformationCardHome } from './InformationCardHome';
import { InformationCardDetail } from './InformationCardDetail';
import { IResponseDetail } from '../../types';
import { Iprops } from './interface';

const Card = ({
  movie,
  contentType,
  isFavoriteSection,
  showIconHeart,
  isDetail,
}: Iprops) => {
  const navigate = useNavigate();
  const contentTypeCustom = movie?.media_type ? movie?.media_type : contentType;

  const haveMediaType = movie && 'media_type' in movie;
  if (!haveMediaType && movie) {
    movie['media_type'] = contentTypeCustom;
  }

  const goToPageDetail = (
    movie: IResponseDetail,
    contentTypeCustom: string
  ) => {
    return navigate('/' + contentTypeCustom + '/' + movie.id);
  };

  const propsToInformationCardHome = {
    movie,
    contentTypeCustom,
    goToPageDetail,
    contentType,
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

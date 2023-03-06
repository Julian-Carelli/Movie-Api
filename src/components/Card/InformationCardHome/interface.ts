import { IResponseDetail } from '../../../types';

export interface IProps {
  movie: IResponseDetail;
  contentTypeCustom: string;
  goToPageDetail: (movie: IResponseDetail, contentTypeCustom: string) => void;
  contentType: string;
  showIconHeart: boolean;
  isFavoriteSection: boolean;
  isDetail: boolean;
}

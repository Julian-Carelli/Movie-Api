import { IResponseDetail } from '../../types';

export interface Iprops {
  movie: IResponseDetail;
  contentType: string;
  isFavoriteSection: boolean;
  showIconHeart: boolean;
  isDetail: boolean;
}

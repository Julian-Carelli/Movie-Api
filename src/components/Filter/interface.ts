import { IMediaType } from '../../types';

export interface IProps {
  filterClass: string;
  getFilter: (contentType: IMediaType) => void;
  filter: IMediaType;
  titleName: string;
  currentFilterToFocus: string;
  isFavoriteSection: boolean;
}

import { IMediaType, IResponseDetail } from '../../types';

export interface IProps {
  sectionName: string;
  sectionTitle: string;
  getFilter: (contentType: IMediaType) => void;
  isFavoriteSection: boolean;
  contents: IResponseDetail[] | null;
  contentType: string;
  currentFilterToFocus: string;
}

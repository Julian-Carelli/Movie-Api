import { IResponseDetail } from '../../types';

export interface IProps {
  contents: IResponseDetail[] | null;
  contentType: string;
  isFavoriteSection: boolean;
}

import { IResponseDetail } from '../pages/typesPageDetails';
import { IMediaType } from '../pages/typesPageDetails';

export type TParamsSelectContent = {
  contentType: IMediaType | string;
  content: IResponseDetail;
};

export type TDispatchFavorites = (favorite: IResponseDetail) => void;
export type TDispatchTop = (page?: number) => Promise<void>;
export type TContent = IResponseDetail[] | [];
export type TGenderList = {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
};

export interface IActions {
  addToFavorites: TDispatchFavorites;
  deleteToFavorites: TDispatchFavorites;
  getTopSeries: TDispatchTop;
  getTopMovies: TDispatchTop;
}

export interface IValue {
  movies: TContent;
  series: TContent;
  favorites: TContent;
  actions: IActions;
  genderSeries: TGenderList;
  genderMovies: TGenderList;
  selectionContent: TContent;
}

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

export interface IGender {
  id: number;
  name: string;
}

export type IMediaType = 'movie' | 'tv' | 'all';

export interface IResponseDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: string;
  budget: number;
  gender_name: string[];
  genres: IGender[];
  genre_ids?: number[];
  homepage: string;
  id: number;
  name?: string;
  imdb_id: string;
  media_type?: IMediaType | string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_counter: number;
}

export type TAddToFavorite = {
  type: 'ADD_TO_FAVORITE';
  payload: { favorites: IResponseDetail };
};

export type TDeleteToFavorite = {
  type: 'DELETE_TO_FAVORITE';
  payload: { favorites: IResponseDetail };
};

export type TGetSeries = {
  type: 'GET_SERIES';
  payload: { series: IResponseDetail[] | [] };
};

export type TGetMovies = {
  type: 'GET_MOVIES';
  payload: { movies: IResponseDetail[] | [] };
};

export type TGenderListSeries = {
  type: 'GET_GENDER_LIST_SERIES';
  payload: { genderSeries: TGenderList };
};

export type TGenderListMovies = {
  type: 'GET_GENDER_LIST_MOVIES';
  payload: { genderMovies: TGenderList };
};

export type IActionsReducer =
  | TAddToFavorite
  | TDeleteToFavorite
  | TGetSeries
  | TGetMovies
  | TGenderListSeries
  | TGenderListMovies;

export interface IInitialState {
  actions?: {
    deleteToFavorites: (favorite: IResponseDetail) => void;
    addToFavorites: (favorite: IResponseDetail) => void;
    getTopSeries: (page?: number) => Promise<void>;
    getTopMovies: (page?: number) => Promise<void>;
  };
  movies: IResponseDetail[] | [];
  series: IResponseDetail[] | [];
  favorites: IResponseDetail[] | [];
  genderSeries: TGenderList;
  genderMovies: TGenderList;
}

export type TSelectionContent = {
  contentType: IMediaType | string;
  content: IResponseDetail[] | null;
};

export type TFilterFocus = {
  contentPopular: IMediaType;
  contentFavorite: IMediaType;
};

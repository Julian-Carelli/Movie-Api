import { IActionsReducer, IInitialState } from '../types';

let initialState: IInitialState = {
  movies: [],
  series: [],
  favorites: [],
  genderMovies: {
    genres: [
      {
        id: 1,
        name: '',
      },
    ],
  },
  genderSeries: {
    genres: [
      {
        id: 1,
        name: '',
      },
    ],
  },
};
const movieReducer = (
  state: IInitialState,
  action: IActionsReducer
): IInitialState => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_FAVORITE':
      const favoriteIsDuplicate = state.favorites.some(
        (favorite) => favorite.id === payload.favorites.id
      );
      if (favoriteIsDuplicate) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, payload.favorites],
      };
    case 'DELETE_TO_FAVORITE':
      const currentFavorites = state.favorites.filter(
        (favorite) => favorite.id !== payload.favorites.id
      );
      return {
        ...state,
        favorites: currentFavorites,
      };
    case 'GET_SERIES':
      return {
        ...state,
        series: [...state.series, ...payload.series],
      };
    case 'GET_MOVIES':
      return {
        ...state,
        movies: [...state.movies, ...payload.movies],
      };
    case 'GET_GENDER_LIST_SERIES':
      return {
        ...state,
        genderSeries: payload.genderSeries,
      };
    case 'GET_GENDER_LIST_MOVIES':
      return {
        ...state,
        genderMovies: payload.genderMovies,
      };
    default:
      return state;
  }
};

export { movieReducer, initialState };

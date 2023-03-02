const initialState = {
  movies: [],
  series: [],
  favorites: [],
  genderMovies: [],
  genderSeries: [],
  selectionContent: {
    contentType: '',
    content: null,
  },
};
const movieReducer = (state, action) => {
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
        series: payload.series,
      };
    case 'GET_MOVIES':
      return {
        ...state,
        movies: payload.movies,
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

    case 'SELECT_CURRENT_CONTENT':
      return {
        ...state,
        selectionContent: {
          ...state.selectionContent,
          contentType: action.payload.contentType,
          content: action.payload.content,
        },
      };
  }
};

export { movieReducer, initialState };

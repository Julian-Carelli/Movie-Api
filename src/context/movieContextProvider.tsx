/* eslint-disable react-hooks/exhaustive-deps*/
import { createContext, useEffect, useReducer, useMemo } from 'react';
import { movieReducer, initialState } from '../reducer/movieReducer';
import { MoviesService } from '../services/moviesService';
import { IInitialState, IResponseDetail } from '../types';

const MovieContext = createContext<IInitialState | null>(null);

interface IProps {
  children: React.ReactNode;
}

const MovieContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const moviesService = new MoviesService();

  const getTopMovies = async (page?: number) => {
    const results: IResponseDetail[] = await moviesService.getTopMovies(page);
    dispatch({
      type: 'GET_MOVIES',
      payload: {
        movies: results,
      },
    });
  };

  const getTopSeries = async (page?: number) => {
    const results = await moviesService.getTopSeries(page);
    dispatch({
      type: 'GET_SERIES',
      payload: {
        series: results,
      },
    });
  };

  const getGenderListSeries = useMemo(
    () => async () => {
      const results = await moviesService.getGenreTvShowList();
      dispatch({
        type: 'GET_GENDER_LIST_SERIES',
        payload: {
          genderSeries: results,
        },
      });
    },
    []
  );

  const getGenderListMovies = useMemo(
    () => async () => {
      const results = await moviesService.getGenreMovieList();
      dispatch({
        type: 'GET_GENDER_LIST_MOVIES',
        payload: {
          genderMovies: results,
        },
      });
    },
    []
  );

  const addToFavorites = (favorite: IResponseDetail) => {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: {
        favorites: favorite,
      },
    });
  };

  const deleteToFavorites = (favorite: IResponseDetail) => {
    dispatch({
      type: 'DELETE_TO_FAVORITE',
      payload: {
        favorites: favorite,
      },
    });
  };

  useEffect(() => {
    const allPromise = Promise.all([
      getGenderListMovies(),
      getGenderListSeries(),
      getTopMovies(),
      getTopSeries(),
    ]);
    allPromise
      .then(() => {
        console.log('load initial finished');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const value = {
    movies: state.movies,
    series: state.series,
    favorites: state.favorites,
    actions: {
      addToFavorites,
      deleteToFavorites,
      getTopSeries,
      getTopMovies,
    },
    genderSeries: state.genderSeries,
    genderMovies: state.genderMovies,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export { MovieContextProvider, MovieContext };

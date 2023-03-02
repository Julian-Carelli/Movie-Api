import { createContext, useEffect, useReducer, useMemo } from "react";
import { movieReducer, initialState } from "../reducer/movieReducer";
import { MoviesService } from '../services/moviesService';

const MovieContext: any = createContext(null);

const MovieContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState)
    const moviesService = new MoviesService();

    const getTopMovies = useMemo(() => async () => {
        const results = await moviesService.getTopMovies();
        dispatch({
            type: "GET_MOVIES",
            payload: {
                movies: results
            }
        })
    }, [])

    const getTopSeries = useMemo(() => async () => {
        const results = await moviesService.getTopSeries();
        dispatch({
            type: "GET_SERIES",
            payload: {
                series: results,
            }
        })
    }, [])

    const getGenderListSeries = useMemo(() => async () => {
        const results = await moviesService.getGenreTvShowList();
        dispatch({
            type: "GET_GENDER_LIST_SERIES",
            payload: {
                genderSeries: results,
            }
        })
    }, [])

    const getGenderListMovies = useMemo(() => async () => {
        const results = await moviesService.getGenreMovieList();
        dispatch({
            type: "GET_GENDER_LIST_MOVIES",
            payload: {
                genderMovies: results,
            }
        })
    }, [])

    const addToFavorites = favorite => {
        dispatch({
            type: "ADD_TO_FAVORITE",
            payload: {
                favorites: favorite
            }
        })
    }

    const deleteToFavorites = favorite => {
        dispatch({
            type: "DELETE_TO_FAVORITE",
            payload: {
                favorites: favorite
            }
        })
    }

    const selectCurrentContent = ({ contentType, content }) => {
        dispatch({
            type: "SELECT_CURRENT_CONTENT",
            payload: {
                contentType,
                content,
            }
        })
    }

    useEffect(() => {
        const allPromise = Promise.all([getGenderListMovies(), getGenderListSeries(), getTopMovies(), getTopSeries()]);
        allPromise
            .then(() => {
                console.log("load initial finished")
            }).catch(error => {
                console.error(error) //handlear errores
            });
    }, []);

    const value = {
        movies: state.movies,
        series: state.series,
        favorites: state.favorites,
        actions: {
            addToFavorites,
            deleteToFavorites,
            selectCurrentContent,
        },
        genderSeries: state.genderSeries,
        genderMovies: state.genderMovies,
        selectionContent: state.selectionContent,
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}

export { MovieContextProvider, MovieContext };
import { createContext, useState, useEffect } from "react";
import { MoviesService } from '../Services/MoviesService';

const MovieContext: any = createContext(null);

const MovieContextProvider = ({ children }) => {
    const [allMovies, setAllMovies] = useState<any>();
    const [allSeries, setAllSeries] = useState<any>();
    const [favorites, setFavorites] = useState<any>([]);
    const moviesService = new MoviesService();

    const getTopMovies = async () => {
        const results = await moviesService.getTopMovies();
        setAllMovies(results)
    }

    const getTopSeries = async () => {
        const results = await moviesService.getTopSeries();
        setAllSeries(results)
    }

    const state = {
        allMovies,
        allSeries,
        favorites,
    }

    const setState = {
        setAllMovies,
        setAllSeries,
        setFavorites,
    }

    useEffect(() => {
        getTopMovies()
        getTopSeries()
    }, []);


    return (
        <MovieContext.Provider value={{state, setState}}>
            {children}
        </MovieContext.Provider>
    )
}

export { MovieContextProvider, MovieContext };

export const API_KEY = process.env.REACT_APP_API_KEY;
export const ENDPOINT_TOP_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
export const ENDPOINT_TOP_SERIES = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;
export const ENDPOINT_SEARCH = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=`;
export const ENDPOINT_IMAGES = 'https://image.tmdb.org/t/p/w500/';
export const ENDPOINT_PAGE_MOVIE_DETAIL = `https://api.themoviedb.org/3/movie/`;
export const ENDPOINT_PAGE_TV_DETAIL = `https://api.themoviedb.org/3/tv/`;
export const ENDPOINT_GENRE_MOVIE_LIST = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
export const ENDPOINT_GENRE_TVSHOW_LIST = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`;
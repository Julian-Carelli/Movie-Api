import {
  ENDPOINT_TOP_MOVIES,
  ENDPOINT_TOP_SERIES,
  ENDPOINT_PAGE_MOVIE_DETAIL,
  ENDPOINT_PAGE_TV_DETAIL,
  ENDPOINT_SEARCH,
  ENDPOINT_GENRE_MOVIE_LIST,
  ENDPOINT_GENRE_TVSHOW_LIST,
  API_KEY,
} from '../constants/urls';
import { restClient } from '../rest-client';

class MoviesService {
  async getTopMovies(page?: number) {
    const urlToGetPage = ENDPOINT_TOP_MOVIES + '&page=' + page;
    const { results } = await restClient(
      page ? urlToGetPage : ENDPOINT_TOP_MOVIES
    );
    return results;
  }

  async getTopSeries(page?: number) {
    const urlToGetPage = ENDPOINT_TOP_SERIES + '&page=' + page;
    const { results } = await restClient(
      page ? urlToGetPage : ENDPOINT_TOP_SERIES
    );
    return results;
  }

  async getGenreMovieList() {
    const results = await restClient(ENDPOINT_GENRE_MOVIE_LIST);
    return results;
  }

  async getGenreTvShowList() {
    const results = await restClient(ENDPOINT_GENRE_TVSHOW_LIST);
    return results;
  }

  async getPageMovieDetails(detailId: string) {
    const pageDetailById =
      ENDPOINT_PAGE_MOVIE_DETAIL + detailId + '?api_key=' + API_KEY;
    const response = await restClient(pageDetailById);
    return response;
  }

  async getPageSerieDetails(detailId: string) {
    const pageDetailById =
      ENDPOINT_PAGE_TV_DETAIL + detailId + '?api_key=' + API_KEY;
    const response = await restClient(pageDetailById);
    return response;
  }

  async getSearches(query) {
    const searchByQuery = ENDPOINT_SEARCH + query;
    const { results } = await restClient(searchByQuery);
    return results;
  }
}

export { MoviesService };

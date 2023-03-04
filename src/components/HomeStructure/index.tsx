import { useContext, useEffect, useState } from 'react';
import { Carousel } from '../Carousel';
import { MovieContext } from '../../context/movieContextProvider';
import { MoviesService } from '../../services/moviesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HomeStructure = () => {
  const [value, setValue] = useState<any>();
  const [filterFavorite, setFilterFavorite] = useState<any>(null);
  const [selectionContent, setSelectionContent] = useState<any>({
    contentType: '',
    content: null,
  });
  const { movies, series, favorites }: any = useContext(MovieContext);
  const movieService = new MoviesService();

  const getFilterFavorites = (filter) => {
    if (filter === 'all') {
      return setFilterFavorite(null);
    }
    const favoritesCurrent = favorites.filter(
      (favorite) => favorite.media_type === filter
    );
    setFilterFavorite(favoritesCurrent);
  };

  const getContent = (contentType) => {
    if (contentType === 'movie') {
      return setSelectionContent({
        contentType: 'movie',
        content: movies,
      });
    }

    return setSelectionContent({
      contentType: 'tv',
      content: series,
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getSearch = async (event) => {
    event.preventDefault();
    const response = await movieService.getSearches(value);
    setSelectionContent({
      contentType: null,
      content: response,
    });
  };

  useEffect(() => {
    setSelectionContent({
      contentType: 'movie',
      content: movies,
    });
  }, [movies]);

  useEffect(() => {
    setFilterFavorite(favorites);
  }, [favorites]);

  return (
    <div>
      <div
        style={{
          paddingLeft: '35px',
          paddingTop: '60px',
          paddingBottom: '25px',
        }}
      >
        <div className="Search">
          <form onSubmit={(event) => getSearch(event)}>
            <input
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="Search Movies and Series"
            ></input>
            <FontAwesomeIcon icon={faSearch} />
          </form>
        </div>
      </div>
      <div className="YOUR__LIKED__STUFF">
        <div className="YOUR__LIKED__STUFF__content">
          <h3>Your liked stuff</h3>
        </div>
        <div className="YOUR__LIKED__STUFF__container">
          <div className="Filter-all" onClick={() => getFilterFavorites('all')}>
            <span>All</span>
          </div>
          <div
            className="Filter-movie"
            onClick={() => getFilterFavorites('movie')}
          >
            <span>Movies</span>
          </div>
          <div className="Filter-tv" onClick={() => getFilterFavorites('tv')}>
            <span>TV</span>
          </div>
        </div>
        <Carousel
          isFavoriteSection={true}
          contents={filterFavorite || favorites}
        ></Carousel>
      </div>
      <div className="TOP__MOVIES__SHOWS">
        <div className="TOP__MOVIES__SHOWS__content">
          <h3>Top Movies and Shows</h3>
        </div>
        <div className="TOP__MOVIES__SHOWS__container">
          <div className="Filter-movie" onClick={() => getContent('movie')}>
            <span>Movies</span>
          </div>
          <div className="Filter-tv" onClick={() => getContent('tv')}>
            <span>TV</span>
          </div>
        </div>
        <Carousel
          isFavoriteSection={false}
          contents={selectionContent.content}
          contentType={selectionContent.contentType}
        ></Carousel>
      </div>
    </div>
  );
};

export { HomeStructure };

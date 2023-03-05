import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/movieContextProvider';
import { Search } from '../components/Search';
import { Section } from '../components/Section';

const Home = () => {
  const { movies, series, favorites }: any = useContext(MovieContext);
  const [filterFavorite, setFilterFavorite] = useState<any>(null);
  const [selectionContentMovies, setSelectionContentMovies] = useState<any>({
    contentType: '',
    content: null,
  });
  const [selectionContentSeries, setSelectionContentSeries] = useState<any>({
    contentType: '',
    content: null,
  });
  const [whichShow, setWhichShow] = useState('movie');
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
    setWhichShow(contentType);
    if (contentType === 'movie') {
      return setSelectionContentMovies({
        contentType: 'movie',
        content: movies,
      });
    }

    return setSelectionContentSeries({
      contentType: 'tv',
      content: series,
    });
  };

  useEffect(() => {
    setSelectionContentMovies({
      contentType: 'movie',
      content: movies,
    });
  }, [movies]);

  useEffect(() => {
    setSelectionContentSeries({
      contentType: 'tv',
      content: series,
    });
  }, [series]);

  useEffect(() => {
    setFilterFavorite(favorites);
  }, [favorites]);

  return (
    <div>
      <Search
        setSelectionContent={
          whichShow === 'movie'
            ? setSelectionContentMovies
            : setSelectionContentSeries
        }
      />
      <Section
        sectionName={'YOUR__LIKED__STUFF'}
        sectionTitle={'Your liked stuff'}
        getFilter={getFilterFavorites}
        contents={filterFavorite || favorites}
        isFavoriteSection={true}
      />
      <Section
        sectionName={'TOP__MOVIES__SHOWS'}
        sectionTitle={'Top Movies and Shows'}
        getFilter={getContent}
        contents={
          whichShow === 'movie'
            ? selectionContentMovies.content
            : selectionContentSeries.content
        }
        contentType={
          whichShow === 'movie'
            ? selectionContentMovies.contentType
            : selectionContentSeries.contentType
        }
        isFavoriteSection={false}
      />
    </div>
  );
};

export { Home };

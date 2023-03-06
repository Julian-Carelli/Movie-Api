import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/movieContextProvider';
import { Search } from '../components/Search';
import { Section } from '../components/Section';
import {
  IInitialState,
  IMediaType,
  IResponseDetail,
  TFilterFocus,
  TSelectionContent,
} from '../types';

const Home = () => {
  const { movies, series, favorites }: IInitialState = useContext(MovieContext);
  const [filterFavorite, setFilterFavorite] = useState<
    IResponseDetail[] | null
  >(null);
  const [selectionContentMovies, setSelectionContentMovies] =
    useState<TSelectionContent>({
      contentType: '',
      content: null,
    });
  const [selectionContentSeries, setSelectionContentSeries] =
    useState<TSelectionContent>({
      contentType: '',
      content: null,
    });
  const [whichShow, setWhichShow] = useState('movie');
  const [currentFilterToFocus, setCurrentFilterToFocus] =
    useState<TFilterFocus>({
      contentPopular: 'movie',
      contentFavorite: 'all',
    });
  const getFilterFavorites = (filter: IMediaType) => {
    setCurrentFilterToFocus({
      ...currentFilterToFocus,
      contentFavorite: filter,
    });
    if (filter === 'all') {
      return setFilterFavorite(null);
    }
    const favoritesCurrent: IResponseDetail[] = favorites.filter(
      (favorite: IResponseDetail) => favorite.media_type === filter
    );
    setFilterFavorite(favoritesCurrent);
  };

  const getContent = (contentType: IMediaType) => {
    setCurrentFilterToFocus({
      ...currentFilterToFocus,
      contentPopular: contentType,
    });
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
        contentType={''}
        currentFilterToFocus={currentFilterToFocus.contentFavorite}
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
        currentFilterToFocus={currentFilterToFocus.contentPopular}
      />
    </div>
  );
};

export { Home };

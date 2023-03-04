import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../context/movieContextProvider';
import { Search } from '../components/Search';
import { Section } from '../components/Section';

const Home = () => {
  const [filterFavorite, setFilterFavorite] = useState<any>(null);
  const [selectionContent, setSelectionContent] = useState<any>({
    contentType: '',
    content: null,
  });
  const { movies, series, favorites }: any = useContext(MovieContext);

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

  useEffect(() => {
    setSelectionContent({
      contentType: 'tv',
      content: series,
    });
  }, [series]);

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
      <Search setSelectionContent={setSelectionContent} />
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
        contents={selectionContent.content}
        contentType={selectionContent.contentType}
        isFavoriteSection={false}
      />
    </div>
  );
};

export { Home };

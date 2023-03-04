import { useEffect, useState } from 'react';
import { Card } from '../components/Card/index';
import { MoviesService } from '../services/moviesService';

const moviesService = new MoviesService();

const decideByMovieOrSerie = async (contentType, contentId) => {
  if (contentType === 'movie') {
    const content = await moviesService.getPageMovieDetails(contentId);
    return content;
  }
  const content = await moviesService.getPageSerieDetails(contentId);
  return content;
};

const PageDetails = () => {
  const [currentContent, setcurrentContent] = useState<any>(null);
  const hashArray: any = window.location.hash.split('/');
  const contentType: any = hashArray[1];
  const contentId = hashArray[2];

  useEffect(() => {
    (async () => {
      const content = await decideByMovieOrSerie(contentType, contentId);
      setcurrentContent(content);
    })();
  }, [contentType, contentId]);

  if (currentContent === null) {
    return null;
  }

  return (
    <div className="Page-details">
      <div className="Page-details__content">
        <h2>{currentContent?.title || currentContent?.name}</h2>
      </div>
      <Card
        movie={currentContent}
        contentType={contentType}
        isFavoriteSection={false}
        showIconHeart={false}
        isDetail={true}
      />
    </div>
  );
};

export { PageDetails };

import { useContext } from 'react';
import { MovieContext } from '../context/movieContextProvider';
import { Card } from '../components/Card/index';

const PageDetails = () => {
  const value: any = useContext(MovieContext);
  return (
    <div>
      <Card
        movie={value.selectionContent.content}
        contentType={value.selectionContent.contentType}
        isFavoriteSection={false}
        showIconHeart={false}
      />
    </div>
  );
};

export { PageDetails };

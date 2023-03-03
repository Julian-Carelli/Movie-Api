import { useContext } from 'react';
import { MovieContext } from '../context/movieContextProvider';
import { Card } from '../components/Card/index';

const PageDetails = () => {
  const { selectionContent } = useContext<any>(MovieContext);

  const content = selectionContent.content;
  return (
    <div
      className="Page-details"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40px',
      }}
    >
      <div>
        <h2 style={{ fontSize: '50px', color: 'rgb(134, 93, 255)' }}>
          {content?.title || content?.name}
        </h2>
      </div>
      <Card
        movie={content}
        contentType={selectionContent.contentType}
        isFavoriteSection={false}
        showIconHeart={false}
        isDetail={true}
      />
    </div>
  );
};

export { PageDetails };

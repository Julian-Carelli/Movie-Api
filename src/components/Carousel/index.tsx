import { useContext, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from '../Card';
import { MovieContext } from '../../context/movieContextProvider';

interface Iprops {
  contents: any;
  contentType: any;
  isFavoriteSection: any;
}

const Carousel: any = (props: Iprops) => {
  const { contents, contentType = null, isFavoriteSection } = props;
  const { actions }: any = useContext(MovieContext);
  const [counterContentType, setCounterContentType] = useState({
    movie: {
      counter: 1,
    },
    tv: {
      counter: 1,
    },
  });

  const decideHydrateMoviesOrSeries = (contentType, page) => {
    if (contentType === 'movie') {
      return actions.getTopMovies(page);
    }

    return actions.getTopSeries(page);
  };

  const decideInitialSlide = (contentType) => {
    return counterContentType[contentType].index;
  };

  function isDecimal(input) {
    const inputNumber = input.toString();
    return inputNumber.includes('.');
  }

  const settings = {
    speed: 500,
    infinite: false,
    centerMode: false,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: contentType && decideInitialSlide(contentType),
    afterChange: (b) => {
      if (contentType && !isDecimal(b / 15)) {
        setCounterContentType({
          ...counterContentType,
          [contentType]: {
            counter: (counterContentType[contentType].counter += 1),
          },
        });

        decideHydrateMoviesOrSeries(
          contentType,
          counterContentType[contentType].counter
        );
      }

      return false;
    },
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="Carousel">
      {contents && contents.length > 0 && (
        <Slider {...settings}>
          {contents.map((content) => (
            <Card
              movie={content}
              isFavoriteSection={isFavoriteSection}
              showIconHeart={true}
              isDetail={false}
              contentType={contentType}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export { Carousel };

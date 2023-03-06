import { useContext, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from '../Card';
import { MovieContext } from '../../context/movieContextProvider';
import { IActions, IResponseDetail } from '../../types';

interface IProps {
  contents: IResponseDetail[] | null;
  contentType: string;
  isFavoriteSection: boolean;
}

const Carousel = ({ contents, contentType, isFavoriteSection }: IProps) => {
  const { actions }: { actions: IActions } = useContext(MovieContext);
  const [counterContentType, setCounterContentType] = useState({
    movie: {
      counter: 1,
    },
    tv: {
      counter: 1,
    },
  });

  const decideHydrateMoviesOrSeries = (contentType: string, page: number) => {
    if (contentType === 'movie') {
      return actions.getTopMovies(page);
    }

    return actions.getTopSeries(page);
  };

  const isDecimal = (input: number) => {
    const inputNumber = input.toString();
    return inputNumber.includes('.');
  };

  const getNewContentInScroll = (b: number, divide: number) => {
    if (contentType && !isDecimal(b / divide)) {
      setCounterContentType({
        ...counterContentType,
        [contentType]: {
          counter: (counterContentType[
            contentType as keyof typeof counterContentType
          ].counter += 1),
        },
      });

      decideHydrateMoviesOrSeries(
        contentType,
        counterContentType[contentType as keyof typeof counterContentType]
          .counter
      );
    }
  };

  const settings = {
    speed: 500,
    infinite: false,
    centerMode: false,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    afterChange: (b: number) => {
      getNewContentInScroll(b, 15);
    },
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          dots: false,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 12);
          },
        },
      },
      {
        breakpoint: 1320,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 9);
          },
        },
      },
      {
        breakpoint: 1023,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 6);
          },
        },
      },
      {
        breakpoint: 680,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 3);
          },
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 3);
          },
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
              key={content.id}
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

import { useContext, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from '../Card';
import { MovieContext } from '../../context/movieContextProvider';
import { IProps } from './interface';

const Carousel = ({ contents, contentType, isFavoriteSection }: IProps) => {
  const { actions } = useContext(MovieContext);
  const [counterContentType, setCounterContentType] = useState({
    movie: {
      counter: 1,
    },
    tv: {
      counter: 1,
    },
  });
  const slider = useRef<Slider>(null);

  const decideHydrateMoviesOrSeries = (contentType: string, page: number) => {
    if (contentType === 'movie') {
      return actions?.getTopMovies(page);
    }

    return actions?.getTopSeries(page);
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
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    afterChange: (b: number) => {
      getNewContentInScroll(b, 15);
    },
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          arrows: false,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 12);
          },
        },
      },
      {
        breakpoint: 1400,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0,
          arrows: false,
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
          arrows: false,
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
          arrows: false,
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
          arrows: false,
          initialSlide: 0,
          afterChange: (b: number) => {
            getNewContentInScroll(b, 3);
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (slider && slider.current) {
      slider.current.slickGoTo(0);
    }
  }, [contentType]);

  return (
    <div className="Carousel">
      {contents && contents.length > 0 && (
        <Slider {...settings} ref={slider}>
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

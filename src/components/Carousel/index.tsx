import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from '../Card';

interface Iprops {
  contents: any;
  contentType: any;
  isFavoriteSection: any;
}

const Carousel: any = (props: Iprops) => {
  const { contents, contentType = null, isFavoriteSection } = props;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
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

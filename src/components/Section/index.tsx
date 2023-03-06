import { Carousel } from '../Carousel';
import { Filter } from '../Filter';
import { IProps } from './interface';

const Section = ({
  sectionName,
  sectionTitle,
  getFilter,
  isFavoriteSection,
  contents,
  contentType,
  currentFilterToFocus,
}: IProps) => {
  return (
    <div className={sectionName}>
      <div className={`${sectionName}__content`}>
        <h3>{sectionTitle}</h3>
      </div>
      <div className={`${sectionName}__container`}>
        {isFavoriteSection && (
          <Filter
            filterClass={'Filter-all'}
            getFilter={getFilter}
            filter={'all'}
            titleName={'All'}
            currentFilterToFocus={currentFilterToFocus}
            isFavoriteSection={isFavoriteSection}
          />
        )}
        <Filter
          filterClass={'Filter-movie'}
          getFilter={getFilter}
          filter={'movie'}
          titleName={'Movies'}
          currentFilterToFocus={currentFilterToFocus}
          isFavoriteSection={isFavoriteSection}
        />
        <Filter
          filterClass={'Filter-tv'}
          getFilter={getFilter}
          filter={'tv'}
          titleName={'TV'}
          currentFilterToFocus={currentFilterToFocus}
          isFavoriteSection={isFavoriteSection}
        />
      </div>
      <Carousel
        isFavoriteSection={isFavoriteSection}
        contents={contents}
        contentType={contentType}
      ></Carousel>
    </div>
  );
};

export { Section };

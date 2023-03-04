import { Carousel } from '../Carousel';
import { Filter } from '../Filter';

const Section = ({
  sectionName,
  sectionTitle,
  getFilter,
  isFavoriteSection,
  contents,
  contentType = null,
}) => {
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
          />
        )}
        <Filter
          filterClass={'Filter-movie'}
          getFilter={getFilter}
          filter={'movie'}
          titleName={'Movies'}
        />
        <Filter
          filterClass={'Filter-tv'}
          getFilter={getFilter}
          filter={'tv'}
          titleName={'TV'}
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

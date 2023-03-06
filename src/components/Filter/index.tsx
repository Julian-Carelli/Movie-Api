import { IMediaType } from '../../types';

interface IProps {
  filterClass: string;
  getFilter: (contentType: IMediaType) => void;
  filter: IMediaType;
  titleName: string;
  currentFilterToFocus: string;
  isFavoriteSection: boolean;
}

const Filter = ({
  filterClass,
  getFilter,
  filter,
  titleName,
  currentFilterToFocus,
  isFavoriteSection,
}: IProps) => {
  const showActiveFilter = (
    isFavoriteSection: boolean,
    filter: string,
    currentFilterToFocus: string
  ) => {
    if (filter === currentFilterToFocus) {
      if (isFavoriteSection) {
        return 'Filter-favorite-active-' + currentFilterToFocus;
      }

      return 'Filter-popular-active-' + currentFilterToFocus;
    }
    return '';
  };
  return (
    <div
      className={`${filterClass} ${showActiveFilter(
        isFavoriteSection,
        filter,
        currentFilterToFocus
      )} `}
      onClick={() => getFilter(filter)}
    >
      <span>{titleName}</span>
    </div>
  );
};

export { Filter };

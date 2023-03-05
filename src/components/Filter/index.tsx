const Filter = ({
  filterClass,
  getFilter,
  filter,
  titleName,
  currentFilterToFocus,
  isFavoriteSection,
}) => {
  const showActiveFilter = (
    isFavoriteSection,
    filter,
    currentFilterToFocus
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

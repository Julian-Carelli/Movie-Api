const Filter = ({ filterClass, getFilter, filter, titleName }) => (
  <div className={filterClass} onClick={() => getFilter(filter)}>
    <span>{titleName}</span>
  </div>
);

export { Filter };

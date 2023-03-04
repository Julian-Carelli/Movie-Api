import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MoviesService } from '../../services/moviesService';

const movieService = new MoviesService();

const Search = ({ setSelectionContent }) => {
  const [value, setValue] = useState<any>();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getSearch = async (event) => {
    event.preventDefault();
    const response = await movieService.getSearches(value);
    setSelectionContent({
      contentType: null,
      content: response,
    });
  };

  return (
    <div className="Search">
      <div className="Search__container">
        <form onSubmit={(event) => getSearch(event)}>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search Movies and Series"
          ></input>
          <FontAwesomeIcon className="Search__icon" icon={faSearch} />
        </form>
      </div>
    </div>
  );
};

export { Search };

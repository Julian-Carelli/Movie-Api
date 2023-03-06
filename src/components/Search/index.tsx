import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MoviesService } from '../../services/moviesService';
import { TSelectionContent } from '../../types';

const movieService = new MoviesService();

interface IProps {
  setSelectionContent: React.Dispatch<React.SetStateAction<TSelectionContent>>;
}

const Search = ({ setSelectionContent }: IProps) => {
  const [value, setValue] = useState<any>();

  const handleChange = (event: {
    target: {
      value: string;
    };
  }) => {
    setValue(event.target.value);
  };

  const getSearch = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await movieService.getSearches(value);
    setSelectionContent({
      contentType: '',
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

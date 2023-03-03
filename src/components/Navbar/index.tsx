import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to={'/'}>
        <FontAwesomeIcon icon={faClapperboard} />
      </Link>
    </div>
  );
};

export { Navbar };

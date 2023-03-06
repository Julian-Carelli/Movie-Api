import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="Navbar">
      <Link to={'/'}>
        <FontAwesomeIcon icon={faClapperboard} />
        <span>The Film Club</span>
      </Link>
    </div>
  );
};

export { Navbar };

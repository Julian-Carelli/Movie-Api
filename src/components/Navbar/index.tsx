import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className="Navbar" style={{ padding: '15px', background: '#865DFF' }}>
      <Link to={'/'}>
        <FontAwesomeIcon
          icon={faClapperboard}
          style={{ fontSize: '30px', color: '#191825' }}
        />
      </Link>
    </div>
  );
};

export { Navbar };

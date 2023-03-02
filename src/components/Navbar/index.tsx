import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    return (
        <div className="Navbar" style={{paddingLeft: "36px", paddingTop: "20px"}}>
            <Link to={"/"}>
                <FontAwesomeIcon icon={faClapperboard} style={{fontSize: "30px"}} />
            </Link>
        </div>
    )
}

export { Navbar };
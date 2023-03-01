import { useContext } from 'react';
import { MovieContext } from '../../Context/movieContextProvider';
import { Link } from 'react-router-dom';
import { ENDPOINT_IMAGES } from '../../Constants/urls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const IMAGE_NOT_FOUND = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";

interface Iprops {
    movie: any
    contentType?: any
}

const existsImage = (movie) => {
    const neededKeys = ['poster_path', 'backdrop_path', 'poster_path'];
    let keyActive: any = null;
    neededKeys.some(key => {
        const isExistKey = movie && Object.keys(movie).includes(key) && movie[key]
        if (isExistKey) {
            keyActive = key;
        }
    });
    return keyActive !== null ? `${ENDPOINT_IMAGES}${movie[keyActive]}` : IMAGE_NOT_FOUND;
}

const Card = (props:Iprops) => {
    const { movie, contentType } = props;
    const contentTypeCustom = movie?.media_type ? movie?.media_type : contentType;
    const { state, setState }: any = useContext(MovieContext);
    const { setFavorites } = setState;
    const { favorites } = state;

    const addFavorite = movie => {
        setFavorites([
            ...favorites,
            movie,
        ])
    }
    
    return (
        <div className='Card' key={movie?.id} style={{padding: "0px 40px"}}>
            <div className="Card__image">
                <Link to={"/" + movie?.id + "?content-type=" + contentTypeCustom}>
                    <img src={existsImage(movie)} alt={movie?.name} style={{width:"300px", height: "400px", borderRadius: "10px"}}/>
                </Link>
            </div>
            <div className="Card__information">
                <div>
                    <h4>{movie?.title}</h4> 
                </div>
            </div>
            <div className="Card__action">
                <div>
                    
                </div>
                <div>
                    <FontAwesomeIcon icon={faHeart} onClick={() => addFavorite(movie)}/>
                </div>
            </div>
        </div>
    )
}

export { Card };
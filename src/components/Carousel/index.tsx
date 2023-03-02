import react, { useContext } from 'react';
import { MovieContext } from '../../context/movieContextProvider';

interface Iprops {
    renderCards: Function,
}

const Carousel: any = (props: Iprops) => {
    const { renderCards } = props;
    const data = useContext(MovieContext)

    return (
        <div className='Carousel' style={{display: "flex"}}>
            {renderCards && renderCards()}
        </div>
    )
}

export { Carousel };
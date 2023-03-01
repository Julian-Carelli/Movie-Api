import { MovieContextProvider } from '../Context/movieContextProvider';
import { HomeStructure } from '../Components/HomeStructure';

const Home = () => {
    return (
        <MovieContextProvider>
            <HomeStructure />
        </MovieContextProvider>  
    )
}


export { Home }

import { useContext, useEffect, useState } from 'react';
import { Carousel } from '../Carousel';
import { Card } from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { MovieContext } from '../../Context/movieContextProvider'
import { MoviesService } from '../../Services/MoviesService';

const HomeStructure = () => {
    const [value, setValue] = useState<any>();
    const [selectionContent, setSelectionContent] = useState<any>({
        contentType: '',
        content: null,
    });
    const { state, setState }: any = useContext(MovieContext);
    const { allMovies, allSeries, favorites } = state;
    const movieService = new MoviesService();
    
    const getContent = (contentType) => {
        if (contentType === "movie") {
            return setSelectionContent({
                contentType: "movie",
                content: allMovies,
            });
        }

        return setSelectionContent({
            contentType: "tv",
            content: allSeries,
        });
    }

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const getSearch = async (event) => {
        event.preventDefault()
        const response = await movieService.getSearches(value);
        setSelectionContent({
            contentType: null,
            content: response,
        })
    }

    useEffect(() => {
        setSelectionContent({
            contentType: "movie",
            content: allMovies,
        })
    }, [allMovies])
    
    return (
        <div>
            <div>
                <FontAwesomeIcon icon={faClapperboard} />
            </div>
            <div>
                <div>
                    <form onSubmit={(event) => getSearch(event)}>
                        <input type="text" value={value} onChange={handleChange} placeholder="Search Movies and Series"></input>
                        <button type="submit">Buscar</button>
                    </form>
                </div>
            </div>
            <div className="YOUR__LIKED__STUFF">
                <div style={{paddingLeft: "36px"}}>
                    <h3>Your liked stuff</h3>
                </div>
                <div className="" style={{display: "flex", alignItems: "center", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "40px"}}>
                    <div className="Filter" style={{marginRight: "40px", padding: "5px 20px"}}>
                        <span>All</span>
                    </div>
                    <div className="Filter" style={{marginRight: "40px", padding: "5px 20px"}}>
                        <span>Movies</span>
                    </div>
                    <div className="Filter">
                        <span>TV</span>
                    </div>
                </div>
                <Carousel
                    renderCards={() => favorites && favorites.map((movie:any) => <Card movie={movie} />)}
                >
                </Carousel>
            </div>
            <div className="TOP__MOVIES__SHOWS">
                <div style={{paddingLeft: "36px"}}>
                    <h3>Top Movies and Shows</h3>
                </div>
                <div className="" style={{display: "flex", alignItems: "center", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "40px"}}>
                    <div className="Filter" onClick={() => getContent("movie")} style={{marginRight: "40px", padding: "5px 20px"}}>
                        <span>Movies</span>
                    </div>
                    <div className="Filter" onClick={() => getContent("tv")} >
                        <span>TV</span>
                    </div>
                </div>
                <Carousel
                    renderCards={() => selectionContent.content && selectionContent?.content.map((content:any) => <Card movie={content} contentType={selectionContent?.contentType} />)}
                >
                </Carousel>
            </div>
        </div>
    )
      
};

export { HomeStructure }
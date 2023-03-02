import { useContext, useEffect, useState } from 'react';
import { Carousel } from '../Carousel';
import { Card } from '../Card';
import { MovieContext } from '../../context/movieContextProvider'
import { MoviesService } from '../../services/moviesService';

const HomeStructure = () => {
    const [value, setValue] = useState<any>();
    const [filterFavorite, setFilterFavorite] = useState<any>(null);
    const [selectionContent, setSelectionContent] = useState<any>({
        contentType: '',
        content: null,
    });
    const { movies, series, favorites } :any = useContext(MovieContext);
    const movieService = new MoviesService();

    const getFilterFavorites = filter => {
        if (filter === "all") {
            return setFilterFavorite(null)
        }
        const favoritesCurrent = favorites.filter(favorite => favorite.media_type === filter)
        setFilterFavorite(favoritesCurrent)
    }
    
    const getContent = (contentType) => {
        if (contentType === "movie") {
            return setSelectionContent({
                contentType: "movie",
                content: movies,
            });
        }

        return setSelectionContent({
            contentType: "tv",
            content: series,
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
            content: movies,
        })
    }, [movies])

    return (
        <div>
            <div style={{padding: "35px"}}>
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
                    <div className="Filter" onClick={() => getFilterFavorites("all")} style={{marginRight: "40px", padding: "5px 20px"}}>
                        <span>All</span>
                    </div>
                    <div className="Filter" onClick={() => getFilterFavorites("movie")} style={{marginRight: "40px", padding: "5px 20px"}}>
                        <span>Movies</span>
                    </div>
                    <div className="Filter" onClick={() => getFilterFavorites("tv")}>
                        <span>TV</span>
                    </div>
                </div>
                <Carousel
                    renderCards={() => (filterFavorite || favorites) && (filterFavorite || favorites).map((movie:any) => <Card movie={movie} />)}
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
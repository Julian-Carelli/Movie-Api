import { useEffect, useState } from "react";
import { Card } from '../Components/Card/index';
import { MoviesService } from "../Services/MoviesService";

const PageDetails = () => {
    const [detail, setDetail] = useState<any>();
    const detailId = window.location.pathname.replace("/", "");
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const contentType = searchParams.get('content-type');
    const moviesService = new MoviesService();

    const getPageMovieDetails = async () => {
        if (contentType === "tv") {
            const response = await moviesService.getPageSerieDetails(detailId);
            return setDetail(response)
        }

        const response = await moviesService.getPageMovieDetails(detailId);
        return setDetail(response)
    }

    useEffect(() => {
        getPageMovieDetails()
    }, []);

    return (
        <div>
            <Card movie={detail} />
        </div>
    )
}

export { PageDetails }
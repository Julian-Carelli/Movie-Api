export interface IGender {
  id: number;
  name: string;
}

export type IMediaType = 'movie' | 'tv';

export interface IResponseDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: string;
  budget: number;
  gender_name: any;
  genres: IGender[];
  homepage: string;
  id: number;
  name?: string;
  imdb_id: string;
  media_type?: IMediaType | string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object[];
  production_countries: object[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_counter: number;
}

type genre = {
  id: number;
  name: string;
};

type production_company = {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
};

export interface IMovie {
  title?: string;
  id?: number;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  popularity?: number;
  genres?: genre[];
  backdrop_path?: string;
  adult?: boolean;
  production_companies?: production_company[];
}

export interface IVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IMovieDetail {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  genres: genre[];
  overview: string;
  poster_path: string;
  release_date?: string;
  runtime?: string;
  original_title: string;
  production_companies: production_company[];
  homepage?: string;
  videos?: any;
}

export interface ISearchMovie {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

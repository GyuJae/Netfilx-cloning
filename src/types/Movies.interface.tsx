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
}

export interface ISearchMovie {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

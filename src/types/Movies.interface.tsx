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
  title: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path?: string;
  popularity: number;
  genres: genre[];
  backdrop_path?: string;
  adult: boolean;
  production_companies: production_company[];
}

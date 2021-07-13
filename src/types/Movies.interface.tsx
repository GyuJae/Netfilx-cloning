export interface IMovie {
  title: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  backdrop_path?: string;
  adult: boolean;
}

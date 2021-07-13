// title id original_title overview poster_path release_date vote_average vote_count popularity genre_ids backdrop_path

import React from "react";
import styled from "styled-components";

interface IMoviePoster {
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

let IMGURL_ORIGIN = "https://image.tmdb.org/t/p/original";

const MoviePosterContainer = styled.div``;

const Img = styled.img`
  width: 150px;
  height: 200px;
  border-radius: 4px;
  margin-right: 5px;
`;

const MoviePoster: React.FC<IMoviePoster> = ({
  title,
  id,
  original_title,
  overview,
  poster_path,
  release_date,
  vote_average,
  vote_count,
  popularity,
  genre_ids,
  backdrop_path,
  adult,
}) => {
  const imgUrl = IMGURL_ORIGIN + poster_path;
  return (
    <MoviePosterContainer>
      <Img src={imgUrl} alt="poster" />
    </MoviePosterContainer>
  );
};

export default MoviePoster;

// title id original_title overview poster_path release_date vote_average vote_count popularity genre_ids backdrop_path

import React from "react";
import styled from "styled-components";
import { IMovie } from "../types/Movies.interface";

let IMGURL_ORIGIN = "https://image.tmdb.org/t/p/original";

const MoviePosterContainer = styled.div`
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.5);
  }
`;

const Img = styled.img`
  width: 190px;
  height: 250px;
  border-radius: 4px;
  margin-right: 5px;
`;

const ImgNull = styled.div`
  width: 190px;
  height: 250px;
  border-radius: 4px;
  margin-right: 5px;
  color: ${(props) => props.theme.redColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border: 1px solid #999999;
  background-color: ${(props) => props.theme.blackColor};
`;

const MoviePoster: React.FC<IMovie> = ({
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
    <MoviePosterContainer key={id}>
      {poster_path ? (
        <Img src={imgUrl} alt="poster" />
      ) : (
        <ImgNull>Photo ✖</ImgNull>
      )}
    </MoviePosterContainer>
  );
};

export default MoviePoster;

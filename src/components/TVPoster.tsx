import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ITV } from "../types/TV.interface";

let IMGURL_ORIGIN = "https://image.tmdb.org/t/p/original";

const TVPosterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.6);
  }
`;

const Img = styled.img`
  width: 190px;
  height: 250px;
  border-radius: 4px;
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

const TVPoster: React.FC<ITV> = ({
  name,
  id,
  original_name,
  overview,
  poster_path,
  popularity,
  genres,
  backdrop_path,
  adult,
  production_companies,
}) => {
  const imgUrl = IMGURL_ORIGIN + poster_path;

  return (
    <TVPosterContainer key={id}>
      <Link to={`/tv/${id}`}>
        {poster_path ? (
          <Img src={imgUrl} alt="poster" />
        ) : (
          <ImgNull>Photo ✖</ImgNull>
        )}
      </Link>
    </TVPosterContainer>
  );
};

export default TVPoster;

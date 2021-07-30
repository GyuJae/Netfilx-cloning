import React from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { IMGURL_ORIGIN } from "../common.constants";
import { IMovie } from "../types/Movies.interface";

interface IBigPosterSlider {
  movies: IMovie[];
}

const SliderContainer = styled.div`
  padding-top: 10px;
`;

const BG = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
  position: absolute;
  background-size: cover;
  background-position: center;
`;

const BGContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 100%;
  padding-bottom: 80px;
  margin-left: 50px;
  width: 40%;
`;

const Title = styled.h1`
  z-index: 10000;
  color: white;
  font-size: 70px;
  position: relative;
  margin-bottom: 20px;
`;

const Overview = styled.span`
  position: relative;
  margin-bottom: 30px;
  font-size: medium;
`;

const GODetail = styled.div`
  padding: 8px 13px;
  position: relative;
  background-color: #565654;
  font-size: large;
  margin-left: 20px;
  border-radius: 4px;
  &:hover {
    background-color: red;
  }
`;

const BigPosterSlider: React.FC<IBigPosterSlider> = ({ movies }) => {
  const history = useHistory();
  const settings = {
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  const goDetail = (id: string) => history.push(`/${id}`);
  return (
    <SliderContainer>
      <Slider {...settings}>
        {movies.map((movie) => (
          <BGContainer key={movie.id}>
            <BG
              src={
                movie.backdrop_path
                  ? IMGURL_ORIGIN + movie.backdrop_path
                  : "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=673&q=80"
              }
            />
            <SubContainer>
              <Title>{movie.title}</Title>
              <Overview>{movie.overview}</Overview>
              <GODetail onClick={() => goDetail(movie.id + "")}>
                DETAIL
              </GODetail>
            </SubContainer>
          </BGContainer>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default BigPosterSlider;

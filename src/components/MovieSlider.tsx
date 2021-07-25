import Slider from "react-slick";
import styled from "styled-components";
import { IMovie } from "../types/Movies.interface";
import MoviePoster from "./MoviePoster";

interface ISlider {
  data: IMovie[];
}

const SliderContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-right: 10px;
  padding-left: 10px;
`;

const Arrow: React.FC = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: "56%",
        width: "7%",
        opacity: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#090909",
        zIndex: "999",
      }}
      onClick={onClick}
    ></div>
  );
};

const MovieSlider: React.FC<ISlider> = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 4,
    centerPadding: "10px",
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    appendDots: (dots: any) => (
      <div
        style={{
          backgroundColor: "#464646",
          padding: "0px",
          opacity: "70%",
          borderRadius: "10px",
          width: "13%",
          height: "12%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "-33px",
          right: "5px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <SliderContainer>
      <Slider {...settings}>
        {data &&
          data.map((movie) => (
            <MoviePoster
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
            />
          ))}
      </Slider>
    </SliderContainer>
  );
};

export default MovieSlider;

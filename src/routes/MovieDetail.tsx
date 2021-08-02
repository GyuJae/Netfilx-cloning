import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { moviesApi } from "../api";
import {
  IMGURL_ORIGIN,
  VIMEO_VIDEO_URL,
  YOUTUBE_VIDEO_URL,
} from "../common.constants";
import Loader from "../components/Loader";
import VideoUrl from "../components/VideoUrl";
import { IMovieDetail, IVideo } from "../types/Movies.interface";

const MovieDetailContainer = styled.div`
  color: ${(props) => props.theme.whiteColor};
  padding-top: 80px;
  height: 100%;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
`;

const Img = styled.img`
  width: 280px;
  height: 400px;
  border-radius: 4px;
  background-size: cover;
  margin-right: 30px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const ImgNull = styled.div`
  width: 280px;
  height: 400px;
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

const BackGroundImg = styled.img`
  width: 100%;
  height: 89vh;
  border-radius: 4px;
  filter: brightness(50%);
  background-position: center;
  background-image: cover;
  position: absolute;
  z-index: -1000000;
`;

const BackNull = styled.div``;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  opacity: 80%;
`;

const Title = styled.h1`
  font-size: xx-large;
  margin-bottom: 8px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
`;

const Date = styled.div`
  margin-right: 5px;
  font-size: 14px;
`;

const RunTime = styled.span`
  margin-right: 10px;
  font-size: 12px;
`;

const Genres = styled.ul`
  display: flex;
`;

const Genre = styled.li`
  margin-right: 5px;
  font-size: 10px;
  font-weight: 700;
`;

const Overview = styled.span`
  width: 60%;
  font-size: 16px;
  margin-bottom: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  background-color: #63636390;
  border-radius: 4px;
`;

const Logo = styled.img`
  width: 120px;
  height: 100px;
  background-size: cover;
  transition: transform 0.2s;
  opacity: 100%;
  &:hover {
    transform: scale(1.2);
  }
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const VidoesTitle = styled.h1`
  font-size: 17px;
  font-weight: 700;
  margin: 5px 0px;
`;

const VideosContainer = styled.div``;

const MovieDetail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<IMovieDetail | null>(null);
  const [videos, setVideos] = useState<IVideo[]>(movie?.videos.results);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const getMovieDetail = async () => {
      const { data } = await moviesApi.movieDetail(id);
      await setMovie(data);
      await setVideos(data?.videos.results);
      setLoading(false);
    };
    getMovieDetail();
  }, [id, movie, videos]);
  return (
    <MovieDetailContainer key={movie?.id}>
      {loading && !movie ? (
        <Loader />
      ) : (
        <>
          <div>
            {movie?.backdrop_path ? (
              <BackGroundImg src={`${IMGURL_ORIGIN}${movie.backdrop_path}`} />
            ) : (
              <BackNull></BackNull>
            )}
          </div>
          <DetailContainer>
            <a href={movie?.homepage}>
              {movie?.poster_path ? (
                <Img src={IMGURL_ORIGIN + movie?.poster_path} alt="poster" />
              ) : (
                <ImgNull></ImgNull>
              )}
            </a>
            <TextContainer>
              {movie?.original_title && <Title>{movie?.original_title}</Title>}
              <SubContainer>
                {movie?.release_date && <Date>{movie?.release_date}</Date>}
                {movie?.runtime && <RunTime>({movie?.runtime}min)</RunTime>}
                {movie?.genres && (
                  <Genres>
                    {movie?.genres.map((genre) => (
                      <Genre key={genre.id}>{genre.name}</Genre>
                    ))}
                  </Genres>
                )}
              </SubContainer>
              <Overview>{movie?.overview}</Overview>
              {videos && <VidoesTitle>Video List</VidoesTitle>}
              <VideosContainer>
                {videos &&
                  videos.map((video) => (
                    <VideoUrl
                      {...video}
                      url={
                        video.site === "YouTube"
                          ? YOUTUBE_VIDEO_URL + video.key
                          : VIMEO_VIDEO_URL + video.key
                      }
                    />
                  ))}
              </VideosContainer>
              <LogoContainer>
                {movie?.production_companies.map((company, index) =>
                  company.logo_path ? (
                    <Logo
                      src={`${IMGURL_ORIGIN}${company.logo_path}`}
                      key={index}
                    />
                  ) : null
                )}
              </LogoContainer>
            </TextContainer>
          </DetailContainer>
        </>
      )}
    </MovieDetailContainer>
  );
};

export default MovieDetail;

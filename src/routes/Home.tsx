import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import MoviePoster from "../components/MoviePoster";
import { IMovie } from "../types/Movies.interface";

const MovieContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const HomeContainer = styled.div`
  padding-top: 80px;
`;

const Title = styled.span`
  font-size: 20px;
  margin-left: 20px;
`;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlayings, setNowPlaying] = useState<IMovie[]>([]);
  const [populars, setPopular] = useState([]);
  const [upcomings, setUpcoming] = useState([]);

  useEffect(() => {
    const dataLoader = async () => {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying(1);
      setNowPlaying(nowPlaying);
      const {
        data: { results: popular },
      } = await moviesApi.popular(1);
      setPopular(popular);
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming(1);
      setUpcoming(upcoming);

      setLoading(false);
    };
    dataLoader();
  }, []);

  return (
    <HomeContainer>
      {loading && <Loader />}

      {!loading && (
        <>
          <Title>Now Plays</Title>
          <MovieContainer>
            {nowPlayings &&
              nowPlayings.map((nowPlaying) => (
                <MoviePoster
                  title={nowPlaying?.title}
                  id={nowPlaying?.id}
                  original_title={nowPlaying?.original_title}
                  overview={nowPlaying?.overview}
                  poster_path={nowPlaying?.poster_path}
                  release_date={nowPlaying?.release_date}
                  vote_average={nowPlaying?.vote_average}
                  vote_count={nowPlaying?.vote_count}
                  popularity={nowPlaying?.popularity}
                  genre_ids={nowPlaying?.genre_ids}
                  backdrop_path={nowPlaying?.backdrop_path}
                  adult={nowPlaying?.adult}
                />
              ))}
          </MovieContainer>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;

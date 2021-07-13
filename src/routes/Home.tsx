import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { moviesApi } from "../api";
import Loader from "../components/Loader";
import MovieSlider from "../components/MovieSlider";
import Title from "../components/Title";
import { IMovie } from "../types/Movies.interface";

const MovieContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BigContainer = styled.div`
  padding-top: 60px;
`;

const Section = styled.div`
  padding-top: 20px;
`;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlayings, setNowPlaying] = useState<IMovie[]>([]);
  const [populars, setPopular] = useState<IMovie[]>([]);
  const [upcomings, setUpcoming] = useState<IMovie[]>([]);

  useEffect(() => {
    const nowPlayingLoader = async () => {
      const pageNum = Math.floor(Math.random() * 10);
      const {
        data: { results },
      } = await moviesApi.nowPlaying(pageNum);
      setNowPlaying(results);
    };

    const popularsLoader = async () => {
      const pageNum = Math.floor(Math.random() * 10);
      const {
        data: { results },
      } = await moviesApi.popular(pageNum);
      setPopular(results);
    };

    const upcomingLoader = async () => {
      const pageNum = Math.floor(Math.random() * 10);
      const {
        data: { results },
      } = await moviesApi.upcoming(pageNum);
      setUpcoming(results);
    };

    const dataLoader = async () => {
      await nowPlayingLoader();
      await popularsLoader();
      await upcomingLoader();
      setLoading(false);
    };
    dataLoader();
  }, []);

  return (
    <BigContainer>
      {loading && <Loader />}

      {!loading && (
        <>
          <Section>
            <Title title="Now Plays" />
            <MovieContainer>
              {nowPlayings && <MovieSlider data={nowPlayings} />}
            </MovieContainer>
          </Section>
          <Section>
            <Title title="Populars" />
            <MovieContainer>
              {populars && <MovieSlider data={populars} />}
            </MovieContainer>
          </Section>
          <Section>
            <Title title="Upcomings" />
            <MovieContainer>
              {upcomings && <MovieSlider data={upcomings} />}
            </MovieContainer>
          </Section>
        </>
      )}
    </BigContainer>
  );
};

export default Home;

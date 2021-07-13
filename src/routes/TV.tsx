import { useEffect, useState } from "react";
import styled from "styled-components";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import MovieSlider from "../components/MovieSlider";
import Title from "../components/Title";
import { IMovie } from "../types/Movies.interface";

const TvContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BigContainer = styled.div`
  padding-top: 80px;
`;

const Section = styled.div`
  padding-top: 20px;
`;

const TV = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [topRateds, setTopRateds] = useState<IMovie[]>([]);
  const [populars, setPopular] = useState<IMovie[]>([]);
  const [airingTodays, setAiringToday] = useState<IMovie[]>([]);

  useEffect(() => {
    const topRadtedLoader = async () => {
      const pageNum = Math.floor(Math.random() * 10);
      const {
        data: { results },
      } = await tvApi.topRated(pageNum);

      setTopRateds(results);
    };

    const popularsLoader = async () => {
      const pageNum = Math.floor(Math.random() * 10);
      const {
        data: { results },
      } = await tvApi.popular(pageNum);
      setPopular(results);
    };

    const airingTodayLoader = async () => {
      const pageNum = Math.floor(Math.random() * 10);
      const {
        data: { results },
      } = await tvApi.airingToday(pageNum);
      setAiringToday(results);
    };

    const dataLoader = async () => {
      await topRadtedLoader();
      await popularsLoader();
      await airingTodayLoader();
      setLoading(false);
    };
    dataLoader();
  }, []);

  return (
    <BigContainer>
      {loading && <Loader />}{" "}
      {!loading && (
        <>
          <Section>
            <Title title="Top Rated" />
            <TvContainer>
              {topRateds && <MovieSlider data={topRateds} />}
            </TvContainer>
          </Section>
          <Section>
            <Title title="Popular" />
            <TvContainer>
              {populars && <MovieSlider data={populars} />}
            </TvContainer>
          </Section>
          <Section>
            <Title title="Airing Today" />
            <TvContainer>
              {airingTodays && <MovieSlider data={airingTodays} />}
            </TvContainer>
          </Section>
        </>
      )}
    </BigContainer>
  );
};

export default TV;

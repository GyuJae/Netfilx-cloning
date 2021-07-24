import { useEffect, useState } from "react";
import styled from "styled-components";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import Title from "../components/Title";
import TVSlider from "../components/TVSlider";
import { ITV } from "../types/TV.interface";

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
  const [topRateds, setTopRateds] = useState<ITV[]>([]);
  const [populars, setPopular] = useState<ITV[]>([]);
  const [airingTodays, setAiringToday] = useState<ITV[]>([]);

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
              {topRateds && <TVSlider data={topRateds} />}
            </TvContainer>
          </Section>
          <Section>
            <Title title="Popular" />
            <TvContainer>
              {populars && <TVSlider data={populars} />}
            </TvContainer>
          </Section>
          <Section>
            <Title title="Airing Today" />
            <TvContainer>
              {airingTodays && <TVSlider data={airingTodays} />}
            </TvContainer>
          </Section>
        </>
      )}
    </BigContainer>
  );
};

export default TV;

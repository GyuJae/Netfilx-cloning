import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import { ITvDetail } from "../types/TV.interface";

type paramsId = {
  id: string;
};

const TVDetailContainer = styled.div`
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

const TVDetail = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<paramsId>();
  const [TV, setTV] = useState<ITvDetail | null>(null);
  const IMGURL_ORIGIN = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    const getTvDeatil = async () => {
      const { data } = await tvApi.showDetail(id);
      setTV(data);
      console.log(data);
      setLoading(false);
    };
    getTvDeatil();
  }, [id]);

  return (
    <TVDetailContainer key={TV?.id}>
      {loading && !TV ? (
        <Loader />
      ) : (
        <>
          <div>
            {TV?.backdrop_path ? (
              <BackGroundImg src={`${IMGURL_ORIGIN}${TV.backdrop_path}`} />
            ) : (
              <BackNull></BackNull>
            )}
          </div>
          <DetailContainer>
            <a href={TV?.homepage}>
              {TV?.poster_path ? (
                <Img src={IMGURL_ORIGIN + TV?.poster_path} alt="poster" />
              ) : (
                <ImgNull></ImgNull>
              )}
            </a>
            <TextContainer>
              <Title>{TV?.name}</Title>
              <SubContainer>
                {TV?.release_date && <Date>{TV?.release_date}</Date>}
                {TV?.runtime && <RunTime>({TV?.runtime}min)</RunTime>}
                {TV?.genres && (
                  <Genres>
                    {TV?.genres.map((genre) => (
                      <Genre key={genre.id}>{genre.name}</Genre>
                    ))}
                  </Genres>
                )}
              </SubContainer>
              <Overview>{TV?.overview}</Overview>
              <LogoContainer>
                {TV?.production_companies.map((company) =>
                  company.logo_path ? (
                    <Logo src={`${IMGURL_ORIGIN}${company.logo_path}`} />
                  ) : null
                )}
              </LogoContainer>
            </TextContainer>
          </DetailContainer>
        </>
      )}
    </TVDetailContainer>
  );
};

export default TVDetail;

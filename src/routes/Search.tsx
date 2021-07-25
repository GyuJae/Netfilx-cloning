import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { moviesApi, tvApi } from "../api";
import { MOVIE, TV } from "../common.constants";
import Loader from "../components/Loader";
import MoviePoster from "../components/MoviePoster";
import Title from "../components/Title";
import TVPoster from "../components/TVPoster";
import { IMovie, ISearchMovie } from "../types/Movies.interface";
import { ISearchTV, ITV } from "../types/TV.interface";

const SearchConatiner = styled.div`
  padding-top: 100px;
  color: ${(props) => props.theme.whiteColor};
`;

const Container = styled.div`
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-top: 20px;
  padding: 20px 0px;
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    padding: 0px;
  }
  @media screen and (min-width: 550px) and (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ShowMoreContiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShowMore = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.darkBlackColor};
  border: 1px solid #fff;
  font-size: large;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 90%;
  }
`;

let movieResults: IMovie[] = [];
let tvRestuls: ITV[] = [];

const Search = () => {
  const { search } = useLocation();
  const term = search.split("?term=")[1];
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<ISearchMovie>();
  const [tvs, setTVs] = useState<ISearchTV>();
  const [moviePage, setMoviePage] = useState<number>(1);
  const [tvPage, setTVPage] = useState<number>(1);
  const [showMoreMovieLoading, setShowMoreMovieLoading] = useState(true);
  const [showMoreTVLoading, setShowMoreTVLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await moviesApi.search(term, moviePage);
      await setMovies(data);
    };
    const getTVs = async () => {
      const { data } = await tvApi.search(term, tvPage);
      await setTVs(data);
    };
    const getData = async () => {
      await getMovies();
      await getTVs();
      await setLoading(false);
      await setShowMoreMovieLoading(false);
      await setShowMoreTVLoading(false);
    };
    getData();
  }, [term, moviePage, tvPage, movies]);

  const onClick: React.MouseEventHandler<HTMLElement> = async (event) => {
    if (event.currentTarget.id === MOVIE) {
      await setShowMoreMovieLoading(true);
      if (movies?.results) {
        await movieResults.push(...movies?.results);
      }
      await setMoviePage(moviePage + 1);
      await setShowMoreMovieLoading(false);
    } else if (event.currentTarget.id === TV) {
      await setShowMoreTVLoading(true);
      if (tvs?.results) {
        await tvRestuls.push(...tvs?.results);
      }
      await setTVPage(tvPage + 1);
      await setShowMoreTVLoading(false);
    }
  };

  return (
    <SearchConatiner>
      {loading && !movies && !tvs ? (
        <Loader />
      ) : (
        <>
          <Container id={MOVIE}>
            <Title title="Movie" />
            <ContentContainer>
              {movieResults.map((movie) => {
                if (movie.poster_path) {
                  return (
                    <MoviePoster
                      id={movie.id}
                      poster_path={movie.poster_path}
                    />
                  );
                }
                return null;
              })}
              {movies?.results.map((movie) => {
                if (movie.poster_path) {
                  return (
                    <MoviePoster
                      id={movie.id}
                      poster_path={movie.poster_path}
                    />
                  );
                }
                return null;
              })}
            </ContentContainer>
            {movies?.total_pages && moviePage < movies?.total_pages && (
              <ShowMoreContiner>
                {showMoreMovieLoading ? (
                  <Loader />
                ) : (
                  <ShowMore id={MOVIE} onClick={onClick}>
                    Show More
                  </ShowMore>
                )}
              </ShowMoreContiner>
            )}
          </Container>
          <Container id={TV}>
            <Title title="TV" />
            <ContentContainer>
              {tvRestuls.map((tv) => {
                if (tv.poster_path) {
                  return <TVPoster id={tv.id} poster_path={tv.poster_path} />;
                }
                return null;
              })}
              {tvs?.results.map((tv) => {
                if (tv.poster_path) {
                  return <TVPoster id={tv.id} poster_path={tv.poster_path} />;
                }
                return null;
              })}
            </ContentContainer>
            {tvs?.total_pages && tvPage < tvs?.total_pages && (
              <ShowMoreContiner>
                {showMoreTVLoading ? (
                  <Loader />
                ) : (
                  <ShowMore id={TV} onClick={onClick}>
                    Show More
                  </ShowMore>
                )}
              </ShowMoreContiner>
            )}
          </Container>
        </>
      )}
    </SearchConatiner>
  );
};

export default Search;

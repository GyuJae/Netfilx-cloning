import React from "react";
import styled from "styled-components";
import { Link, useHistory, withRouter } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ISearch {
  term: string;
}

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.blackColor};
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  width: 100%;
  height: 10%;
  z-index: 1000;
  padding: 20px;

  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 35px;
  color: ${(props) => props.theme.redColor};
  text-transform: uppercase;
  margin-left: 10px;
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li<{ current: boolean }>`
  font-size: 15px;
  margin-right: 20px;
  font-weight: ${(props) => (props.current ? 700 : 300)};
`;

const SLink = styled(Link)``;

const ImSearchContainer = styled.div`
  font-weight: 700;
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const IconContainer = styled.div<{ useSearch: boolean }>`
  position: ${(props) => (props.useSearch ? "absolute" : "")};
  left: 10px;
  &:hover {
    transform: scale(1.1);
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form``;

const Input = styled.input<{ useSearch: boolean }>`
  padding: 10px 30px;
  padding-right: 2px;
  outline: none;
  border: 1px solid ${(props) => props.theme.whiteColor};
  background-color: ${(props) => props.theme.darkBlackColor};
  color: ${(props) => props.theme.whiteColor};
`;

const Header = withRouter(({ location: { pathname } }) => {
  const history = useHistory();
  const [useSearch, setUseSearch] = useState(false);
  const SearchForm = () => {
    const { register, handleSubmit, getValues } = useForm<ISearch>();

    const onSubmit: SubmitHandler<ISearch> = async () => {
      const { term } = getValues();

      history.push(`/search?term=${term}`);
    };
    return (
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input
            useSearch={useSearch}
            placeholder="Search movies or tvs..."
            {...register("term")}
          />
        </Form>
      </FormContainer>
    );
  };

  return (
    <HeaderContainer>
      <Title>NetFilx</Title>
      <List>
        <Item current={pathname === "/search"}>
          <ImSearchContainer>
            <IconContainer useSearch={useSearch}>
              <ImSearch onClick={() => setUseSearch(!useSearch)} />
            </IconContainer>
            {useSearch && <SearchForm />}
          </ImSearchContainer>
        </Item>
        <Item current={pathname === "/"}>
          <SLink to="/">Movies</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
        </Item>
      </List>
    </HeaderContainer>
  );
});

export default Header;

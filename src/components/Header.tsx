import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

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

const Header = withRouter(({ location: { pathname } }) => (
  <HeaderContainer>
    <Title>NetFilx</Title>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </HeaderContainer>
));

export default Header;

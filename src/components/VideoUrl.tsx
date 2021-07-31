import React from "react";
import styled from "styled-components";
import { IVideo } from "../types/Movies.interface";
import { FaYoutube, FaVimeo } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  &:hover {
    opacity: 0.7;
  }
`;
const VideoName = styled.h1`
  margin-right: 5px;
`;
const Icon = styled.div`
  margin-right: 5px;
  font-size: 14px;
`;

const Official = styled.div`
  background-color: ${(props) => props.theme.blackColor};
  padding: 3px;
  border-radius: 4px;
`;

interface IVideoUrl extends IVideo {
  url: string;
}

const VideoUrl: React.FC<IVideoUrl> = ({ id, name, site, official, url }) => {
  return (
    <a href={url}>
      <Container key={id}>
        <VideoName>{name}</VideoName>
        <Icon>
          {site === "YouTube" ? (
            <FaYoutube
              style={{
                color: "red",
              }}
            />
          ) : (
            <FaVimeo
              style={{
                color: "skyblue",
              }}
            />
          )}
        </Icon>
        {official && <Official>OFFICIAL</Official>}
      </Container>
    </a>
  );
};

export default VideoUrl;

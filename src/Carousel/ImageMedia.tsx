import React from "react";
import styled from "styled-components";
import { Media } from "../types";

interface Props {
  media: Media;
}

const ImageMedia: React.FC<Props> = ({ media: { desktop, mobile } }: Props) => {
  return <Image urlLarge={desktop} urlSmall={mobile} />;
};

export default ImageMedia;

const Image = styled.main<{ urlLarge: string; urlSmall: string }>`
  background-position: center;
  background-image: url(${(props) => props.urlLarge});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;

  @media (max-width: 767px) {
    background-image: url(${(props) => props.urlSmall});
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    background-image: url(${(props) => props.urlSmall});
  }
`;

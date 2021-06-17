import React from "react";
import styled from "styled-components";
import { CTA } from "../types";

interface Props {
  textData: CTA[];
  position: String;
  heading: String;
  subHead: String;
  title: String;
}

const Cta: React.FC<Props> = ({
  textData,
  position,
  title,
  heading,
  subHead,
}: Props) => {
  const renderButtons = () => {
    let positionStyle = "space-between";

    switch (position) {
      case "left": {
        positionStyle = "flex-start";
        break;
      }
      case "right": {
        positionStyle = "flex-end";
        break;
      }
      default: {
        break;
      }
    }

    // the mens and womens buttons have mixed URLs from the BE
    const buttons = textData.map(({ label, url }: CTA, index: number) => (
      <Button key={index} href={url} target="_blank">
        {label}
      </Button>
    ));

    return (
      <ButtonWrapper positionStyle={positionStyle}>{buttons}</ButtonWrapper>
    );
  };

  return (
    <CtaWrapper>
      <Title>{title}</Title>
      <Heading>{heading}</Heading>
      <p>{subHead}</p>
      {renderButtons()}
    </CtaWrapper>
  );
};

export default Cta;

const CtaWrapper = styled.div`
  width: 500px;
  height: 300px;
  position: absolute;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 35px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
`;

const Heading = styled.span`
  color: white;
  font-size: 14px;
  text-align: center;

  @media (max-width: 767px) {
    width: 200px;
  }
`;

const ButtonWrapper = styled.section<{ positionStyle: string }>`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.positionStyle};

   @media (max-width: 767px) {
     width: 200px;
   }
`;

const Button = styled.a`
  height: 40px;
  width: 200px;
  box-sizing: border-box;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 14px;;
`;

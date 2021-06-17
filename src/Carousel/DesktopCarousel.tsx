import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ImageMedia from "./ImageMedia";
import Cta from "./Cta";
import useInterval from "./useInterval";
import { ResponseType } from "../types";

interface Props {
  imageData: ResponseType[];
}

const TRANSITION_TIMEOUT = 500;

const DesktopCarousel: React.FC<Props> = ({ imageData }: Props) => {
  // preload our images to avoid flickers
  useEffect(() => {
    imageData.forEach(({ media: { desktop, mobile } }) => {
      new Image().src = desktop;
      new Image().src = mobile;
    });
  }, [imageData]);

  const [carouselIndexes, setCarouselIndexes] = useState([
    imageData.length - 1,
    0,
    1,
  ]);
  const [offset, setOffset] = useState(-100);
  const [transition, setTransition] = useState(true);
  const [direction, setDirection] = useState("");
  const [isScrolling, setIsScrolling] = useState(true);

  useInterval(
    () => {
      handleCarouselMove("right");
    },
    isScrolling ? null : null
  );

  useEffect(() => {
    if (transition === true) {
      return;
    }

    let [left, middle, right] = carouselIndexes;

    if (direction === "left") {
      right = middle;
      middle = left;
      left = left === 0 ? imageData.length - 1 : (left -= 1);
    } else {
      left = middle;
      middle = right;
      right = right === imageData.length - 1 ? 0 : (right += 1);
    }

    setCarouselIndexes([left, middle, right]);
    setOffset(-100);

    setTimeout(() => {
      setTransition(true);
    }, 20);

    // dont care if the indexes change inside this hook since we're the ones chaging them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition]);

  const handleCarouselMove = (direction: string) => {
    setDirection(direction);
    if (direction === "left") {
      setOffset(offset + 100);
    } else {
      setOffset(offset - 100);
    }

    setTimeout(() => {
      setTransition(false);
    }, TRANSITION_TIMEOUT);
  };

  const clearScrollInterval = () => {
    setIsScrolling(false);
  };

  const setScrollInterval = () => {
    setIsScrolling(true);
  };

  return (
    <React.Fragment>
      <CarouselImageWrapper offset={offset.toString()} transition={transition}>
        {carouselIndexes.map((index: number) => {
          const {
            media,
            cta,
            ctaPosition,
            title,
            heading,
            subhead,
          }: ResponseType = imageData[index];

          return (
            <ContentSection key={index}>
              <ImageMedia media={media} />
              <Cta
                title={title}
                heading={heading}
                subHead={subhead}
                textData={cta}
                position={ctaPosition}
              />
            </ContentSection>
          );
        })}
      </CarouselImageWrapper>

      <main>
        <Chevron
          onMouseEnter={clearScrollInterval}
          onMouseLeave={setScrollInterval}
          onClick={() => {
            handleCarouselMove("left");
          }}
          rotation="-135deg"
          left="3em"
        />
        <Chevron
          onMouseEnter={clearScrollInterval}
          onMouseLeave={setScrollInterval}
          onClick={() => {
            handleCarouselMove("right");
          }}
          rotation="45deg"
          right="3em"
        />
      </main>
    </React.Fragment>
  );
};

export default DesktopCarousel;

const CarouselImageWrapper = styled.main<{
  offset: string;
  transition: boolean;
}>`
  left: ${(props) => props.offset}vw;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: stretch;

  ${(props) =>
    props.transition ? `transition: all ${TRANSITION_TIMEOUT}ms ease-out` : ""};
`;

const Chevron = styled.span<{
  rotation: string;
  top?: string;
  left?: string;
  right?: string;
}>`
  position: absolute;
  top: calc(50% - 1em);
  cursor: pointer;
  ${(props) => (props.left ? `left: ${props.left};` : "")}
  ${(props) => (props.right ? `right: ${props.right};` : "")}

  &::before {
    border-style: solid;
    border-color: white;
    border-width: 1px 0.1px 0 0;
    content: "";
    display: inline-block;
    height: 2em;
    left: 1em;
    position: relative;
    top: 1em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 2em;
    transform: rotate(${(props) => props.rotation});
  }
`;

const ContentSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

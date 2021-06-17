import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DesktopCarousel from "./Carousel/DesktopCarousel";
import { ResponseType } from "./types";

const App: React.FC = () => {
  const [useCars, setUseCars] = useState(
    new URLSearchParams(window.location.search).get("cars") !== null
  );
  const [error, setError] = useState("");
  const [serviceResponse, setServiceResponse] = useState<ResponseType[]>([]);

  useEffect(() => {
    const makeRequest = async () => {
      const resUrl = useCars
        ? "https://frontend-assessment-service.vcomm.io/cars"
        : "http://frontend-assessment-service.vcomm.io/";
      let res;
      try {
        res = await axios.get(resUrl);
      } catch {
        setError(res?.statusText || "error fetching images");
        return;
      }

      setServiceResponse([...res.data.data]);
    };

    makeRequest();
  }, [useCars]);

  return (
    <Main>
      {serviceResponse.length ? (
        <DesktopCarousel imageData={serviceResponse} />
      ) : (
        <h1>...loading</h1>
      )}
    </Main>
  );
};

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  margin: 0;
  top: 0;
  left: 0;
  position: fixed;
`;

export default App;

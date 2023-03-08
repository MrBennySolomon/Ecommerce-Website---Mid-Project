/* eslint-disable react-hooks/exhaustive-deps */
import "../../styles/Home.modules.css";
import ImageSlider from "./ImageSlider";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/context";

const Home = () => {
  const { controller, isLoading, setIsLoading } = useGlobalContext();
  const slides = controller.getSlides();
  const containerStyles = controller.getSlidesStyle();

  useEffect(() => {
    controller.fetchData(setIsLoading);
    controller.initStorage();
  }, []);

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="slider" style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <div className='spinner-div'>
        {isLoading && (
            <div className="lds-default">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
        )}
      </div>
    </div>
  );
};
export default Home;

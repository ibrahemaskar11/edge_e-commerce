import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyImagePlaceholder from "../components/LazyImagePlaceholder";
import MenImg from "../assets/Men_Selection_.jpg";
import WomenImg from "../assets/Women_Selection_1.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Selection = () => {
  const [hoverMen, setHoverMen] = useState(false);
  const [hoverWomen, setHoverWomen] = useState(false);
  const history = useNavigate();
  return (
    <section className="h-[100vh] w-full overflow-y-hidden relative ">
      <div className="flex flex-col lg:flex-row justify-center items-center mx-auto">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            history("/women/");
          }}
          onMouseEnter={() => {
            setHoverWomen(true);
          }}
          onMouseLeave={() => {
            setHoverWomen(false);
          }}
        >
          <div className=" w-full h-[50vh] lg:h-full object-cover overflow-hidden mix-blend-overlay">
            <LazyLoadImage
              src={WomenImg}
              placeholder={<LazyImagePlaceholder />}
              delayTime={700}
              delayMethod="debounce"
              width="100%"
              height="auto"
              effect="blur"
            />
          </div>
          <div className="absolute selection-text flex justify-center items-center ">
            <h1
              className={`${
                hoverWomen ? "text-gray-300 " : "text-slate-100"
              } text-5xl  uppercase tracking-[0.3rem] superior font-[700] z-1`}
            >
              Women
            </h1>
          </div>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => {
            history("/men/");
          }}
          onMouseEnter={() => {
            setHoverMen(true);
          }}
          onMouseLeave={() => {
            setHoverMen(false);
          }}
        >
          <div className=" w-full h-[50vh] lg:h-full object-cover overflow-hidden mix-blend-overlay">
            <LazyLoadImage
              src={MenImg}
              placeholder={<LazyImagePlaceholder />}
              delayTime={700}
              delayMethod="debounce"
              width="100%"
              height="auto"
              effect="blur"
            />
          </div>
          <div className="absolute selection-text flex justify-center items-center ">
            <h1
              className={`${
                hoverMen ? "text-gray-300 " : "text-slate-100"
              } text-5xl  uppercase tracking-[0.3rem] superior font-[700] z-1`}
            >
              Men
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Selection;

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyImagePlaceholder from "../components/LazyImagePlaceholder";

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
          className="  hidden lg:block relative cursor-pointer"
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
          <div className=" w-full h-[50vh] lg:h-full object-cover overflow-hidden">
            <LazyLoadImage
              src={
                "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195088/Women_Selection_1_qz16yd.jpg"
              }
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
          className="  block lg:hidden relative cursor-pointer"
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
          <div className=" w-full h-[50vh] lg:h-full object-cover overflow-hidden">
            <img
              src={
                "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195088/Women_Selection_1_qz16yd.jpg"
              }
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
          className="hidden lg:block relative cursor-pointer"
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
          <div className=" w-full h-[50vh] lg:h-full object-cover overflow-hidden">
            <LazyLoadImage
              src={
                "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195035/Men_Selection__q8edrd.jpg"
              }
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
        <div
          className="block lg:hidden relative cursor-pointer"
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
          <div className=" w-full h-[50vh] lg:h-full object-cover overflow-hidden">
            <img
              src={
                "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195035/Men_Selection__q8edrd.jpg"
              }
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

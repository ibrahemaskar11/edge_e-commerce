import React from "react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { TbPoint } from "react-icons/tb";
import { FaRegDotCircle } from "react-icons/fa";
import { useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const ImageSlider = ({ slides, imageClassnames, showArrows, duration,pageSrc }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const index = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(index);
    }, duration);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const goReverseHandler = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goForwardHandler = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goSlideHandler = (index) => {
    setCurrentIndex(index);
  };
  const childFactory = () => (child) =>
    React.cloneElement(child, { classNames: "fade" });
  return (
    <div className=" h-[35.875rem] ">
      <div className=" w-[22.5rem]  h-[33.875rem] object-cover overflow-hidden  rounded mb-3">
        {showArrows && (
          <div className={`left-side-arrow text-gray-900`}>
            <button onClick={goReverseHandler}>
              <AiOutlineLeft size="24" />
            </button>
          </div>
        )}
        {showArrows && (
          <div className={`right-side-arrow text-gray-900`}>
            <button onClick={goForwardHandler}>
              <AiOutlineRight size="24" />
            </button>
          </div>
        )}
        <div>
          <TransitionGroup childFactory={childFactory("fade")}>
            <CSSTransition key={currentIndex} timeout={100} classNames={"fade"}>
              <img
                src={slides[currentIndex].src}
                alt=""
                className={`${imageClassnames} cursor-pointer`}
                onClick={() => {
                  history(`/${pageSrc}/item/${slides[currentIndex]._id}`);
                }}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div>
          <div className="points-hero">
            {slides?.map((slide, index) => (
              <div key={slide._id} className="mx-[3px] cursor-pointer ">
                <button onClick={() => goSlideHandler(index)}>
                  {currentIndex === index ? (
                    <FaRegDotCircle size="20" className={`text-black`} />
                  ) : (
                    <TbPoint size="20" className={`text-white`} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {slides[currentIndex].description && (
        <div className="flex flex-col">
          <h3 className="text-black/80 font-bold capitalize text-[13px] tracking-[0.5px] mb-2">
            {slides[currentIndex].description}
          </h3>
          <h3 className="text-black font-bold capitalize text-[15px] tracking-[0.5px]">
            {slides[currentIndex].price} &pound;
          </h3>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;

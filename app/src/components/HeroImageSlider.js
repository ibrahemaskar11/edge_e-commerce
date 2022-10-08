import React from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
const HeroImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
  return (
    <div className=" mx-auto flex px-8 py-4 justify-start items-center slider">
      {slides.map((slide) => (
        <div className="lg:mb-0 relative mx-4" key={slide._id}>
          <div className="w-[23.5rem]  h-[34.875rem] object-cover overflow-hidden  rounded mb-3">
            <LazyLoadImage src={slide.url} effect="blur-new-arrivals" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-black/80 font-bold capitalize text-[13px] tracking-[0.5px] mb-2">
              {slide.description}
            </h3>
            <h3 className="text-black font-bold capitalize text-[15px] tracking-[0.5px]">
              {slide.price} &pound;
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroImageSlider;

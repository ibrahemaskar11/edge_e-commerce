import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import LazyImagePlaceholder from "./LazyImagePlaceholder";
import { useNavigate } from "react-router-dom";

const NewFashionImagesMedium = ({ images, duration, pageSrc }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(2);
  const history = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     goForwardHandler();
  //   }, duration);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [start,end]);
  function goForwardHandler() {
    const isEnd = end === images.length;
    if (isEnd) {
      setStart(0);
      setEnd(2);
    } else {
      const newStart = start + 2;
      const newEnd = end + 2;
      setStart(newStart);
      setEnd(newEnd);
    }
  }
  function gobackwardHandler() {
    const isStart = start === 0;
    if (isStart) {
      const lastStart = images.length - 2;
      setStart(lastStart);
      setEnd(images.length);
    } else {
      const newStart = start - 2;
      const newEnd = end - 2;
      setStart(newStart);
      setEnd(newEnd);
    }
  }
  const firstImages = images.slice(start, end);
  
  return (
    <div className="mx-auto flex  px-8 py-4 justify-center items-center relative">
      <div className={`left-side-arrow-hero-medium text-gray-900`}>
        <button onClick={gobackwardHandler}>
          <AiOutlineLeft size="24" className="mt-1" />
        </button>
      </div>
      <div className={`right-side-arrow-hero-medium text-gray-900`}>
        <button onClick={goForwardHandler}>
          <AiOutlineRight size="24" className="mt-1" />
        </button>
      </div>
      {firstImages.map((image, index) => (
        <div
          className=" lg:mb-0 mb-8  relative  mx-4 w-[19.5rem]  h-[28.86rem] "
          key={image._id}
        >
          <div className="object-cover w-full h-full overflow-hidden  rounded mb-3">
            <LazyLoadImage
              onClick={() => {
                history(`/${pageSrc}/item/${image._id}`);
              }}
              src={image.src}
              delayTime={2000}
              delayMethod="throttle"
              placeholder={<LazyImagePlaceholder />}
              effect="blur"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-black/80 font-bold capitalize text-[13px] tracking-[0.5px] mb-2">
              {image.description}
            </h3>
            <h3 className="text-black font-bold capitalize text-[15px] tracking-[0.5px]">
              &pound; {image.price}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NewFashionImagesMedium;

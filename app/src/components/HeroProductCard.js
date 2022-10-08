import React from "react";
import LazyImagePlaceholder from "./LazyImagePlaceholder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
const HeroProductCard = ({
  image,
  description,
  price,
  imgClassName,
  id,
  pageSrc,
}) => {
  const history = useNavigate();
  return (
    <div
      className=" lg:mb-0  relative  mx-auto"
    >
      <div
        className={`w-[22.5rem] h-[33.875rem] lg:w-[23.5rem]  lg:h-[34.875rem] object-cover overflow-hidden  rounded my-4 mx-2 relative ${imgClassName} cursor-pointer`}
      >
        <LazyLoadImage
          onClick={() => {
            history(`/${pageSrc}/item/${id}`);
          }}
          src={image}
          delayTime={2000}
          delayMethod="throttle"
          placeholder={<LazyImagePlaceholder />}
          effect="blur"
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-black/80 font-bold capitalize text-[13px] tracking-[0.5px] mb-2">
          {description}
        </h3>
        <h3 className="text-black font-bold capitalize text-[15px] tracking-[0.5px]">
          &pound; {price}
        </h3>
      </div>
    </div>
  );
};

export default HeroProductCard;

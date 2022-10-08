import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import HeroProductCard from "./HeroProductCard";
import { useNavigate } from "react-router";
const NewFashionImagesLg = ({ images, duration, pageSrc }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(3);
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
      setEnd(3);
    } else {
      const newStart = start + 3;
      const newEnd = end + 3;
      setStart(newStart);
      setEnd(newEnd);
    }
    console.log(start, end);
  }
  function gobackwardHandler() {
    const isStart = start === 0;
    if (isStart) {
      const lastStart = images.length - 3;
      setStart(lastStart);
      setEnd(images.length);
    } else {
      const newStart = start - 3;
      const newEnd = end - 3;
      setStart(newStart);
      setEnd(newEnd);
    }
    console.log(start, end);
  }
  const firstImages = images.slice(start, end);

  return (
    <div className="mx-auto flex  px-8 py-3 justify-center items-center relative">
      <div className={`left-side-arrow-hero text-gray-900`}>
        <button onClick={gobackwardHandler}>
          <AiOutlineLeft size="33" className="mt-1" />
        </button>
      </div>
      <div className={`right-side-arrow-hero text-gray-900`}>
        <button onClick={goForwardHandler}>
          <AiOutlineRight size="33" className="mt-1" />
        </button>
      </div>
      {firstImages.map((product, index) => (
        <HeroProductCard
          pageSrc={pageSrc}
          image={product.src}
          description={product.description}
          id={product._id}
          price={product.price}
          key={product._id}
        />
      ))}
    </div>
  );
};

export default NewFashionImagesLg;

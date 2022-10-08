import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import HeroProductCard from "./HeroProductCard";
const NewFashionImages = ({ images, duration, pageSrc }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
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
      setEnd(4);
    } else {
      const newStart = start + 4;
      const newEnd = end + 4;
      setStart(newStart);
      setEnd(newEnd);
    }
    console.log(start, end);
  }
  function gobackwardHandler() {
    const isStart = start === 0;
    if (isStart) {
      const lastStart = images.length - 4;
      setStart(lastStart);
      setEnd(images.length);
    } else {
      const newStart = start - 4;
      const newEnd = end - 4;
      setStart(newStart);
      setEnd(newEnd);
    }
    console.log(start, end);
  }
  const showImages = images.slice(start, end);
  
  return (
    <div className="mx-auto flex  px-8 py-4 justify-center items-center relative">
      <div className={`left-side-arrow-hero text-gray-900`}>
        <button onClick={gobackwardHandler}>
          <AiOutlineLeft size="24" className="mt-1" />
        </button>
      </div>
      <div className={`right-side-arrow-hero text-gray-900`}>
        <button onClick={goForwardHandler}>
          <AiOutlineRight size="24" className="mt-1" />
        </button>
      </div>
      {showImages.map((product, index) => (
        <HeroProductCard pageSrc={pageSrc} image={product.src} description={product.description} id={product._id} price={product.price} key={product._id} />
      ))}
    </div>
  );
};

export default NewFashionImages;

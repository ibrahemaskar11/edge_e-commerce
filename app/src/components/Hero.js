import React from "react";
import heroImg from "../assets/hero_img_mob.jpg";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const Hero = ({ refProp }) => {
  
  return (
    <section
      name="support"
      ref={refProp}
      className="w-[full]  relative bg-gray-600/60 overflow-hidden "
    >
      <div className="absolute h-[100vh] w-full  ">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full overflow-hidden object-cover mix-blend-overlay "
        />
      </div>
      <div className="max-w-[1240px] h-[100vh] mx-auto flex flex-col justify-center items-center relative z-1 text-white py-20 px-4">
        <div className="flex flex-col justify-center items-center text-center space-y-8 mb-12 sm:mb-0">
          <h3 className="text-3xl sm:text-5xl  text-white superior capitalize tracking-[0.5rem] sm:mt-12">
            New Summer Collection 2022
          </h3>
          <h1 className="text-xl sm:text-3xl text-gray-300 uppercase superior tracking-[0.3rem]">
            Check out new arrivals
          </h1>
          <div>
            <Link
              to="/selection"
              className="bg-black/90 cursor-pointer hover:bg-white text-center hover:text-black active:bg-white active:text-black font-[400] text-white px-10 py-4 uppercase text-xl flex sm:tracking-[0.3rem]"
            >
              Shop Collection
              <span>
                <AiOutlineRight size="24" className="mt-1 ml-2" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

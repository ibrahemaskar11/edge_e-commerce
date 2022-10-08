import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import NewArrivalImg_Men_1 from "../assets/New_Arrivals_1.jpg";
import NewArrivalImg_Men_2 from "../assets/New_Arrivals_11.jpg";
import NewArrivalImg_Men_3 from "../assets/New_Arrivals_3.jpg";
import NewArrivalImg_Women_1 from "../assets/New_Arriivals_W_9.jpg";
import NewArrivalImg_Women_3 from "../assets/New_Arriivals_W_10.jpg";
import NewArrivalImg_Women_2 from "../assets/New_Arriivals_W_11.jpg";
import { CSSTransition } from "react-transition-group";
import LazyImagePlaceholder from "./LazyImagePlaceholder";
import { Link } from "react-router-dom";


const NewArrivals = (props) => {
  return (
    <section
      id="new-arrivals"
      ref={props.refProp}
      className="w-full bg-gray-100 overflow-hidden"
    >
      <div className="pt-16   flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl tracking-[0.3rem] superior mb-8">
          New Arrivals
        </h1>
        <h3 className="text-2xl tracking-widest text-gray-500 capitalize mb-8 sm:mb-2 lg:mb-0  superior">
          Always the latest and most special products
        </h3>
        <div className=" flex flex-col space-y-12 sm:space-y-4 lg:space-y-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 space-x-0 md:space-x-4 lg:space-x-0 justify-center items-center">
            <div className="hidden lg:block col-span-2 w-[22.5rem] lg:w-[27.5rem] h-[33.875rem] mb-8 lg:mb-0 lg:h-[41.25rem] relative">
              <div className="absolute w-full h-full  object-cover overflow-hidden">
                <LazyLoadImage
                  src={NewArrivalImg_Men_1}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  width="100%"
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="hidden lg:block col-span-2 w-[27.5rem] h-[41.25rem] relative mt-24">
              <div className="absolute w-full h-full  object-cover overflow-hidden">
                <LazyLoadImage
                  src={NewArrivalImg_Men_2}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  className=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="hidden lg:block col-span-2 w-[27.5rem] h-[41.25rem] relative ">
              <div className="absolute w-full h-full  object-cover overflow-hidden">
                <CSSTransition timeout={300} classNames={"zoom"}>
                  <LazyLoadImage
                    src={NewArrivalImg_Men_3}
                    placeholder={<LazyImagePlaceholder />}
                    delayTime={700}
                    delayMethod="debounce"
                    alt=""
                    className=""
                    effect="blur"
                  />
                </CSSTransition>
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="lg:hidden col-span-2 w-[22.5rem]  h-[33.875rem] mx-12 relative mb-4">
              <div className="absolute w-full h-full  object- overflow-hidden rounded-md">
                <LazyLoadImage
                  src={NewArrivalImg_Men_1}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="hidden md:block lg:hidden col-span-2 w-[22.5rem]  h-[33.875rem] relative mb-4 mt-24">
              <div className="absolute w-full h-full  object- overflow-hidden rounded-md">
                <LazyLoadImage
                  src={NewArrivalImg_Men_3}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>

            <div className="hidden lg:block col-span-2 lg:col-span-1 self-start  tracking-[0.3rem] superior uppercase pt-[2rem] lg:pt-[12rem] px-4 text-center">
              <h1 className="text-5xl font-bold mb-4 lg:mb-8">Summer</h1>
              <h1 className="text-5xl font-bold mb-4 lg:mb-8">2022</h1>
              <Link
                to="/men/"
                className="text-5xl font-bold cursor-pointer underline-none hover:text-gray-600"
              >
                Men
              </Link>
            </div>
            <div className=" md:block lg:hidden col-span-4 lg:col-span-1 self-start  tracking-[0.3rem] superior uppercase pt-[2rem] lg:pt-[12rem] px-4 text-center">
              <h1 className="text-5xl font-bold mb-4 lg:mb-8">Summer</h1>
              <h1 className="text-5xl font-bold mb-4 lg:mb-8">2022</h1>
              <Link
                to="/men/"
                className="text-5xl font-bold cursor-pointer underline-none hover:text-gray-600"
              >
                Men
              </Link>
            </div>
          </div>
          {/* SECOND ONE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 space-x-0 md:space-x-4 lg:space-x-0 justify-center items-center">
            <div className="hidden lg:block col-span-2 lg:col-span-1 self-start tracking-[0.3rem] superior uppercase mb-0 pt-[12rem] text-center">
              <h1 className="text-5xl font-bold mb-8">Summer</h1>
              <h1 className="text-5xl font-bold mb-8">2022</h1>
              <Link
                to="/women/"
                className="text-5xl font-bold cursor-pointer hover:text-gray-600 text-center"
              >
                Women
              </Link>
            </div>
            <div className="hidden lg:block col-span-2 w-[22.5rem] lg:w-[27.5rem] h-[33.875rem] lg:h-[41.25rem] relative ">
              <div className="absolute w-full h-full  object- overflow-hidden">
                <LazyLoadImage
                  src={NewArrivalImg_Women_3}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>

            <div className="hidden lg:block col-span-2 w-[27.5rem] h-[41.25rem] relative mt-24">
              <div className="absolute w-full h-full  object-cover overflow-hidden">
                <LazyLoadImage
                  src={NewArrivalImg_Women_1}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  className=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="hidden lg:block col-span-2 w-[27.5rem] h-[41.25rem] relative ">
              <div className="absolute w-full h-full  object-cover overflow-hidden">
                <LazyLoadImage
                  src={NewArrivalImg_Women_2}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  className=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>

            <div className="lg:hidden col-span-2 w-[22.5rem]  h-[33.875rem] mx-12 relative mb-4 mt-0 md:mt-20">
              <div className="absolute w-full h-full  object- overflow-hidden rounded-md">
                <LazyLoadImage
                  src={NewArrivalImg_Women_1}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="hidden md:block lg:hidden col-span-2 w-[22.5rem]  h-[33.875rem] relative mb-4 ">
              <div className="absolute w-full h-full  object- overflow-hidden rounded-md">
                <LazyLoadImage
                  src={NewArrivalImg_Women_2}
                  placeholder={<LazyImagePlaceholder />}
                  delayTime={700}
                  delayMethod="debounce"
                  alt=""
                  effect="blur"
                />
              </div>
              <div>{/* text goes here */}</div>
            </div>
            <div className="lg:hidden col-span-4 self-start tracking-[0.3rem] superior uppercase mb-4 pt-[2rem] text-center">
              <h1 className="text-5xl font-bold  mb-4">Summer</h1>
              <h1 className="text-5xl font-bold mb-4">2022</h1>
              <Link
                to="/women/"
                className="text-5xl font-bold cursor-pointer hover:text-gray-600 text-center"
              >
                Women
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
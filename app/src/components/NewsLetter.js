import React from 'react'

const NewsLetter = () => {
  return (
    <section
      id="news-letter"
      className="w-full bg-[#E6FFDA] barlow overflow-hidden"
    >
      <div className="flex flex-col max-w-[1240px] mx-auto justify-center items-center py-16 text-center">
        <h1 className="tracking-[0.2rem] text-5xl text-black cursor-default font-semibold uppercase mb-8">
          Be The First To Know
        </h1>
        <h3 className="text-2xl lg:text-3xl tracking-widest text-black/80 font-semibold capitalize ">
          THE PERFECT COMBO:
        </h3>
        <h3 className="text-2xl lg:text-3xl tracking-widest text-black/80 font-semibold capitalize mb-8  ">
          ON TREND AND WITH A 10% DISCOUNT
        </h3>
        <h3 className="uppercase text-xl tracking-widest mb-8">
          SUBSCRIBE TO OUR NEWSLETTER
        </h3>
        <div className="w-[22rem] ">
          <input
            type="email"
            placeholder="E-mail"
            className="py-3 px-4 rounded w-full mb-8 border-[2px] border-black/90 outline-none"
          />
          <button className="bg-black/90 text-white uppercase w-full px-4 py-3 rounded hover:bg-black/80 mb-3">
            I'm In
          </button>
          <div className="flex w-full justify-center items-center px-4 py-2">
            <a href="#" className=" px-4 underline text-[13px] ">
              I want to unsubscribe
            </a>
            <a href="#" className=" px-4 underline text-[13px] ">
              See conditions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter
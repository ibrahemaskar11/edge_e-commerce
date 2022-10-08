import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import CircularLoading from "../UI/CircularLoading";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const MenPage = () => {
  const params = useParams();
  const isLoading = useSelector((state) => state.items.isLoading);
  const menItems = useSelector((state) => state.items.menItems);
  const error = useSelector((state) => state.items.error);
  let filteredMenItems = [];
  filteredMenItems = menItems.filter(
    (item) => item.subCategory === params.filter
  );
  const renderedItems = filteredMenItems.length ? filteredMenItems : menItems;
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  const errorPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center">
        <h1 className="text-5xl abel mb-8">Error 404</h1>
        <h1 className="text-5xl abel">
          Selected item was not found on the server
        </h1>
      </div>
    </div>
  );
  return (
    <section id="men-page" className=" w-full ">
      <Navbar changeColor={true} isShadow={false} />
      {error && errorPanner}
      {isLoading && !error && loadingPanner}
      {!isLoading && !error && (
        <div className="w-full h-full pt-[7rem]">
          <div className="max-w-[960px] mx-auto mb-0 lg:mb-4">
            <ul className="flex flex-row flex-wrap space-x-2 lg:space-x-4 justify-center items-center text-[16px] w-full mx-auto text-black border-blackish abel ">
              <li>
                <Link
                  to="/men/"
                  className={`px-4 lg:px-9 py-2  my-1 mx-1 lg:mx-0 sm:my-0 rounded border-[1px] hover:border-blackish  filter-item ${
                    filteredMenItems.length === 0 && "border-blackish"
                  }`}
                >
                  See All
                </Link>
              </li>
              <li>
                <Link
                  to="/men/T-shirt"
                  className={`px-4 lg:px-9 py-2 border-[1px] my-1 mx-1 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "T-shirt" && "border-blackish"
                  }`}
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/men/Shirt"
                  className={`px-4 lg:px-9 py-2 border-[1px] my-1 mx-1 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Shirt" && "border-blackish"
                  }`}
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/men/Tie-Dye"
                  className={`px-4 lg:px-9 py-2 border-[1px] my-1 mx-1 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Tie-Dye" && "border-blackish"
                  }`}
                >
                  Tie-Dye
                </Link>
              </li>
              <li className="mt-8 sm:mt-0">
                <Link
                  to="/men/Jeans"
                  className={`px-4 lg:px-9 py-2 border-[1px] my-1 mx-1 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Jeans" && "border-blackish"
                  }`}
                >
                  Jeans
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto py-12 justify-center items-center xl:px-[10rem] text-center`}
          >
            {renderedItems.map((item, index) => (
              <div className="mb-4 self-center mx-auto" key={item._id}>
                <ProductCard
                  item={item}
                  imgClassName={"img-element"}
                  pageSrc="men"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </section>
  );
};

export default MenPage;

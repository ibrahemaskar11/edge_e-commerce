import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import CircularLoading from "../UI/CircularLoading";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const WomenPage = () => {
  const params = useParams();
  const isLoading = useSelector((state) => state.items.isLoading);
  const womenItems = useSelector((state) => state.items.womenItems);
  let filteredWomenItems = [];
  filteredWomenItems = womenItems.filter(
    (item) => item.subCategory === params.filter
  );

  const renderedItems = filteredWomenItems.length
    ? filteredWomenItems
    : womenItems;
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  return (
    <section id="men-page" className=" w-full">
      <Navbar changeColor={true} isShadow={false} />
      {isLoading ? (
        loadingPanner
      ) : (
        <div className="w-full h-full pt-[8rem]">
          <div className="max-w-[960px] mx-auto mb-0 lg:mb-4">
            <ul className="flex flex-row flex-wrap  lg:space-x-4 justify-center items-center text-[16px] w-full text-black border-blackish abel ">
              <li className="">
                <Link
                  to="/Women/"
                  className={`px-4 lg:px-9 py-2   my-2 mx-2 lg:mx-0 sm:my-0 rounded border-[1px] hover:border-blackish  filter-item ${
                    filteredWomenItems.length === 0 && "border-blackish"
                  }`}
                >
                  See All
                </Link>
              </li>
              <li className="">
                <Link
                  to="/Women/T-Shirt"
                  className={`px-4 lg:px-9 py-2  border-[1px] my-2 mx-2 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "T-Shirt" && "border-blackish"
                  }`}
                >
                  T-Shirts
                </Link>
              </li>
              <li className="">
                <Link
                  to="/Women/Shirt"
                  className={`px-4 lg:px-9 py-2  border-[1px] my-2 mx-2 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Shirt" && "border-blackish"
                  }`}
                >
                  Shirts
                </Link>
              </li>
              <li className="">
                <Link
                  to="/Women/Tops"
                  className={`px-4 lg:px-9 py-2  border-[1px] my-2 mx-2 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Tops" && "border-blackish"
                  }`}
                >
                  Tops
                </Link>
              </li>
              <li className="mt-8 sm:mt-0">
                <Link
                  to="/Women/Tie-Dye"
                  className={`px-4 lg:px-9 py-2  border-[1px] my-2 mx-2 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Tie-Dye" && "border-blackish"
                  }`}
                >
                  Tie-Dye
                </Link>
              </li>
              <li className="mt-8 sm:mt-0">
                <Link
                  to="/Women/Pants"
                  className={`px-4 lg:px-9 py-2  border-[1px] my-2 mx-2 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Pants" && "border-blackish"
                  }`}
                >
                  Pants
                </Link>
              </li>
              <li className="mt-8 sm:mt-0">
                <Link
                  to="/Women/Dress"
                  className={`px-4 lg:px-9 py-2  border-[1px] my-2 mx-2 lg:mx-0 sm:my-0 rounded hover:border-blackish  filter-item ${
                    params.filter === "Dress" && "border-blackish"
                  }`}
                >
                  Dresses
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
                  pageSrc="women"
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

export default WomenPage;

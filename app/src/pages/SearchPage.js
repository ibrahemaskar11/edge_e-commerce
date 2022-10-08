import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CircularLoading from "../UI/CircularLoading";
import ProductCard from "../components/ProductCard";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
const SearchPage = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [touched, setTouched] = useState(false);
  const items = useSelector((state) => state.items.items);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim() !== "") {
        setTouched(true);
        const searchItems = items
          .filter((item) =>
            item.itemName
              .replaceAll(" ", "")
              .includes(searchInput.toLowerCase().replaceAll(" ", ""))
          )
          .slice(0, 16);
        if (searchItems.length === 0) {
          setSearchError(true);
        }
        setSearchItems(searchItems);
      } else {
        setSearchItems([]);
        setTouched(false)
      }
    });
    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);
  const searchInputEmpty = searchInput.trim().length === 0;
  const isNoSearchItems = searchItems.length === 0;
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  const emptyPanner = (
    <div className="max-w-[960px] mx-auto flex-col">
      <div className="text-center">
        <h1 className="text-5xl abel">No results for "{searchInput}"</h1>
      </div>
    </div>
  );
  const errorPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center">
        <h1 className="text-5xl abel mb-8">Error 404</h1>
        <h1 className="text-5xl abel">Something went wrong</h1>
      </div>
    </div>
  );
  return (
    <section id="men-page" className=" w-full h-[100vh] ">
      <Navbar changeColor={true} isShadow={false} />
      <div className="w-full min-h-[100vh] overflow-y-scroll flex flex-col  justify-center items-center ">
        <div
          className={`max-w-[960px] border-b-2 space-x-4 border-mostlyblack ${
            !isNoSearchItems ? "mt-[8rem]" : ""
          }  flex items-center px-2 w-[90%] lg:w-full mx-auto mb-`}
        >
          <BsSearch size="28" />
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            type="text"
            className=" abel text-2xl outline-none px-2 py-3 w-full placeholder:text-mostlyblack text-mostlyblack"
            placeholder="SEARCH..."
          />
          <AiOutlineClose
            size="28"
            className="cursor-pointer "
            onClick={() => {
              setSearchInput("");
            }}
          />
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto py-12 justify-center items-center lg:px-[10rem] text-center`}
        >
          {touched &&
            !isNoSearchItems && !searchInputEmpty &&
            searchItems?.map((item, index) => (
              <div className="mb-4 self-center mx-auto" key={item._id}>
                <ProductCard
                  item={item}
                  imgClassName={"img-element"}
                  pageSrc="men"
                />
              </div>
            ))}
        </div>
        {touched && isNoSearchItems && emptyPanner}
      </div>
    </section>
  );
};

export default SearchPage;

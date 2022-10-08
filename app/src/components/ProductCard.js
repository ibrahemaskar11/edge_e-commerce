import React from "react";
import LazyImagePlaceholder from "./LazyImagePlaceholder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart/cartSlice";
const ProductCard = ({ item, pageSrc, imgClassName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(false);
  const [SizeDropDown, setSizeDropDown] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    if (selectValue === "") {
      setError(true);
      return
    }
    const addedItem = {
      ...item,
      amount: 1,
      size: selectValue,
      cartId: item._id + selectValue,
    };
    dispatch(
      cartActions.addToCart({
        item: addedItem,
      })
    );
    history('/cart')
  };
  return (
    <div
      className=" lg:mb-0  relative  mx-auto"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className={`w-[22.5rem] h-[33.875rem] xl:w-[23.5rem]  xl:h-[34.875rem] object-cover overflow-hidden  rounded my-4 mx-2 relative ${imgClassName} cursor-pointer`}
      >
        <LazyLoadImage
          onClick={() => {
            history(`/${pageSrc}/item/${item._id}`);
          }}
          src={item.images[0]}
          delayTime={2000}
          delayMethod="throttle"
          placeholder={<LazyImagePlaceholder />}
          effect="blur"
        />

        <div
          className={`flex h-[25px] justify-center items-center z-100 absolute product-card-choices abel  ${
            !isHovered ? "hidden" : ""
          } 
          `}
        >
          <div
            className="w-[50%] h-[25px] flex flex-col-reverse relative bg-white text-mostlyblack abel"
            onMouseEnter={() => {
              setSizeDropDown(true);
            }}
            onMouseLeave={() => {
              setSizeDropDown(false);
            }}
          >
            <h3 className="bg-white focus:bg-white active:bg-white font-[500] uppercase">
              {selectValue === "" ? "Size" : selectValue}
            </h3>
            {SizeDropDown && (
              <ul className="z-100  drop-shadow-2xl abel text-black bg-white text-sm uppercase mt-[9rem]">
                <li
                  key={"XS"}
                  onClick={() => {
                    setSelectValue("XS");
                    setSizeDropDown(false);
                  }}
                  className="py-3 px-4 w-full"
                >
                  XS
                </li>
                <li
                  key={"S"}
                  onClick={() => {
                    setSelectValue("S");
                    setSizeDropDown(false);
                  }}
                  className="py-3 px-4 w-full "
                >
                  S
                </li>
                <li
                  key={"M"}
                  onClick={() => {
                    setSelectValue("M");
                    setSizeDropDown(false);
                  }}
                  className="py-3 px-4 w-full "
                >
                  M
                </li>
                <li
                  key={"L"}
                  onClick={() => {
                    setSelectValue("L");
                    setSizeDropDown(false);
                  }}
                  className="py-3 px-4 w-full "
                >
                  L
                </li>
                <li
                  key={"XL"}
                  onClick={() => {
                    setSelectValue("XL");
                    setSizeDropDown(false);
                  }}
                  className="py-3 px-4 w-full "
                >
                  XL
                </li>
              </ul>
            )}
          </div>
          <div className="h-[25px] w-[50%] ">
            <button
              onClick={addToCartHandler}
              className={`${
                selectValue === "" && "bg-mostlyblack border-mostlyblack"
              }
                  ${
                    selectValue !== "" &&
                    "bg-green-400 border-green-400 hover:bg-green-500 hover:border-green-500"
                  }  ${error && "bg-red-600"}
               text-gray-100 py-[0.5px] w-full font-[600] add-btn`}
            >
              ADD
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-black/80 font-bold capitalize text-[13px] tracking-[0.5px] mb-2">
          {item.itemName}
        </h3>
        <h3 className="text-black font-bold capitalize text-[15px] tracking-[0.5px]">
          &pound; {item.price}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;

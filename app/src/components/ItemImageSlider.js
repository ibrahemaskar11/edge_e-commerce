import React, { useContext } from "react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { TbPoint } from "react-icons/tb";
import { FaRegDotCircle } from "react-icons/fa";
import { useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart/cartSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import CircularLoading from "../UI/CircularLoading";
import { wishListActions } from "../store/wishList/wishListSlice";
import AuthContext from "../store/auth/AuthContext";
const ItemImageSlider = ({
  slides,
  imageClassnames,
  showArrows,
  duration,
  price,
  description,
  itemName,
  availableColors,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [size, setSize] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isLoading = useSelector((state) => state.items.isLoading);

  const [selectError, setSelectError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Selected item was not found on the server"
  );
  // const [item, setItem] = useState();
  const { itemId } = useParams();
  useEffect(() => {
    if (itemId.length !== 24) {
      setError(true);
    }
  }, [itemId]);
  const items = useSelector((state) => state.items.items);
  const item = items.find((item) => item._id === itemId);
  const wishListItems = useSelector((state) => state.wishList.wishListItems);
  const isInWishList = wishListItems.find((item) => item._id === itemId);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const interval = setInterval(() => {
      const index = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(index);
    }, duration);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const goReverseHandler = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goForwardHandler = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goSlideHandler = (index) => {
    setCurrentIndex(index);
  };
  const childFactory = () => (child) =>
    React.cloneElement(child, { classNames: "fade" });
  const addToCartHandler = () => {
    if (!size) {
      setSelectError(true);
      return;
    }
    const addedItem = { ...item, amount: 1, size, cartId: item._id + size };
    dispatch(
      cartActions.addToCart({
        item: addedItem,
      })
    );
    setSelectError(false);
    history("/cart");
  };
  const addToWishList = async () => {
    dispatch(wishListActions.setIsLoading({ isLoading: true }));
    try {
      const userId = localStorage.getItem("userId");
      const doesItemExist = wishListItems.findIndex(
        (wishListItem) => wishListItem._id === item._id
      );
      if (doesItemExist !== -1) {
        throw new Error();
      }
      if (!userId) {
        throw new Error("you need to sign in first");
      }
      const res = await fetch(
        `https://edgee-commercebackend-production.up.railway.app/api/wish/add/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item,
          }),
        }
      );
      const data = await res.json();
      dispatch(wishListActions.setChanged({ changed: true }));
      dispatch(wishListActions.setWishListItems(data.user.wishList));
      dispatch(wishListActions.setIsLoading({ isLoading: false }));
      history("/user/wish-list");
    } catch (error) {
      console.log(error);
      dispatch(wishListActions.setIsLoading({ isLoading: false }));
      setError(true);
      setErrorMessage("Something Went Wrong");
    }
  };
  const removeFromWishList = () => {
    dispatch(wishListActions.removeItemFromWishList({ _id: item._id }));

    console.log(wishListItems);
  };
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  const errorPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center mb-[4rem]">
        <h1 className="text-5xl abel">{errorMessage}</h1>
      </div>
    </div>
  );
  return (
    <div className="pt-24 px-4 abel">
      {error && errorPanner}
      {isLoading && !error && loadingPanner}
      <div className="mx-auto w-[22.5rem] sm:w-full relative  h-[33.875rem] sm:h-[70vh]  object-cover overflow-hidden  rounded mb-3">
        {showArrows && (
          <div className={`left-side-arrow text-gray-900`}>
            <button onClick={goReverseHandler}>
              <AiOutlineLeft size="24" />
            </button>
          </div>
        )}
        {showArrows && (
          <div className={`right-side-arrow text-gray-900`}>
            <button onClick={goForwardHandler}>
              <AiOutlineRight size="24" />
            </button>
          </div>
        )}
        <div className="img-element-page-sm sm:hidden ">
          <TransitionGroup childFactory={childFactory("fade")}>
            <CSSTransition key={currentIndex} timeout={300} classNames={"fade"}>
              <img
                src={slides[currentIndex]}
                alt=""
                className={`${imageClassnames}`}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className="hidden sm:block img-element-page-md ">
          <TransitionGroup childFactory={childFactory("fade")}>
            <CSSTransition key={currentIndex} timeout={300} classNames={"fade"}>
              <img
                src={slides[currentIndex]}
                alt=""
                className={`${imageClassnames}`}
                effect="blur"
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div>
          <div className="points">
            {slides?.map((slide, index) => (
              <div key={index} className="mx-[3px] cursor-pointer ">
                <button onClick={() => goSlideHandler(index)}>
                  {currentIndex === index ? (
                    <FaRegDotCircle size="20" className={`text-black`} />
                  ) : (
                    <TbPoint size="20" className={`text-white`} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-4 abel">
        <h3 className="text-black/80 font-bold capitalize text-center text-lg tracking-[0.5px] mb">
          {itemName}
        </h3>
        <h3 className="text-black font-bold capitalize text-center text-lg tracking-[0.5px]">
          {price} &pound;
        </h3>
      </div>
      <div className="">
        <h3 className="font-bold">Size</h3>
        <ul className="flex flex-row pl-1 space-x-8 text-center mb-8">
          <li
            onClick={() => {
              setSize("XS");
              setSelectError(false);
            }}
            className={`${
              size === "XS"
                ? "text-green-500 hover:text-green-600 border-green-500"
                : "hover:border-mostlyblack border-white"
            } border-b-[1px]   select-size cursor-pointer w-4 py-1`}
          >
            <button>XS</button>
          </li>
          <li
            onClick={() => {
              setSize("S");
              setSelectError(false);
            }}
            className={`${
              size === "S"
                ? "text-green-500 hover:text-green-600 border-green-500"
                : "hover:border-mostlyblack border-white"
            } border-b-[1px]   select-size cursor-pointer w-4 py-1`}
          >
            <button>S</button>
          </li>
          <li
            onClick={() => {
              setSize("M");
              setSelectError(false);
            }}
            className={`${
              size === "M"
                ? "text-green-500 hover:text-green-600 border-green-500"
                : "hover:border-mostlyblack border-white"
            } border-b-[1px]   select-size cursor-pointer w-4 py-1`}
          >
            <button>M</button>
          </li>
          <li
            onClick={() => {
              setSize("L");
              setSelectError(false);
            }}
            className={`${
              size === "L"
                ? "text-green-500 hover:text-green-600 border-green-500"
                : "hover:border-mostlyblack border-white"
            } border-b-[1px]   select-size cursor-pointer w-4 py-1`}
          >
            <button>L</button>
          </li>
          <li
            onClick={() => {
              setSize("XL");
              setSelectError(false);
            }}
            className={`${
              size === "XL"
                ? "text-green-500 hover:text-green-600 border-green-500"
                : "hover:border-mostlyblack border-white"
            } border-b-[1px]   select-size cursor-pointer w-4 py-1`}
          >
            <button>XL</button>
          </li>
        </ul>
      </div>
      <div className="flex justify-start items-start space-x-4 cursor-pointer  ">
        <button
          onClick={addToCartHandler}
          className={`w-full  text-center py-4  hover:bg-white hover:text-black border-[1px] border-mostlyblack bg-mostlyblack text-white  hover:bg-green-dark focus:outline-none  uppercase select-size mb-4 ${
            selectError &&
            "bg-red-600 hover:bg-red-600 hover:text-white border-red-600"
          }`}
        >
          Add to Cart
        </button>
        {isLoggedIn && !isInWishList && (
          <div className="py-4  px-4  text-black   flex items-center select-size ">
            <BsHeart
              onClick={addToWishList}
              size="24"
              color="black"
              className="cursor-pointer"
            />
          </div>
        )}
        {isLoggedIn && isInWishList && (
          <div className="py-4  px-4  text-red-600    flex items-center select-size">
            <BsHeartFill
              onClick={removeFromWishList}
              size="24"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-bold mb-2 border-b-[2px] w-20 border-mostlyblack ">
          Description
        </h3>
        <p>{description}</p>
      </div>
      <div className="py-4 flex flex-row justify-start space-x-[8rem] sm:space-x-[12rem]">
        <div>
          <h3 className="font-bold mb-2 tracking-wide border-b-[2px] border-mostlyblack inline-block">
            Sizing
          </h3>
          <ul>
            <li>XS- 29-30</li>
            <li>S- 31-32</li>
            <li>M- 33-34</li>
            <li>L- 35-36</li>
            <li>XL- 37-38</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold mb-2 tracking-wide border-b-[2px] capitalize border-mostlyblack inline-block">
              available colors
            </h3>
            <ul>
              {availableColors.map((color, index) => (
                <li className="flex space-x-2  items-center" key={index}>
                  <a href="#">{color}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
            <h3 className="font-bold mb-4 tracking-wide border-b-[2px] capitalize border-mostlyblack inline-block">
              Care
            </h3>
            <ul className="flex space-x-4">
              <li>
                <img
                  src="https://static.bershka.net/4/static/itxwebstandard/images/cares/7.png?t=20220928110156"
                  alt=""
                  className="w-[24px] h-[24px]"
                />
              </li>
              <li>
                <img
                  src="https://static.bershka.net/4/static/itxwebstandard/images/cares/14.png?t=20220928110156"
                  alt=""
                  className="w-[24px] h-[24px]"
                />
              </li>
              <li>
                <img
                  src="https://static.bershka.net/4/static/itxwebstandard/images/cares/18.png?t=20220928110156"
                  alt=""
                  className="w-[24px] h-[24px]"
                />
              </li>
              <li>
                <img
                  src="https://static.bershka.net/4/static/itxwebstandard/images/cares/31.png?t=20220928110156"
                  alt=""
                  className="w-[24px] h-[24px]"
                />
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ItemImageSlider;

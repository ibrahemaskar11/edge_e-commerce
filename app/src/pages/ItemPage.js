import React, { useState, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Navbar from "../components/Navbar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularLoading from "../UI/CircularLoading";
import ItemImageSlider from "../components/ItemImageSlider";
import { cartActions } from "../store/cart/cartSlice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { wishListActions } from "../store/wishList/wishListSlice";
import AuthContext from "../store/auth/AuthContext";
const ItemPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [size, setSize] = useState("");
  const [error, setError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Selected item was not found on the server"
  );
  const { itemId } = useParams();
  const wishListItems = useSelector((state) => state.wishList.wishListItems);
  const isInWishList = wishListItems.find((item) => item._id === itemId);
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (itemId.length !== 24) {
      setError(true);
    }
  }, [itemId]);
  const isLoading = useSelector((state) => state.items.isLoading);
  const items = useSelector((state) => state.items.items);
  const item = items.find((item) => item._id === itemId);
  const dispatch = useDispatch();
  const history = useNavigate();

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
  const ImgClickHandler = (index) => {
    setCurrentIndex(index);
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
    <section id="item-page" className="w-full h-full">
      {error && errorPanner}
      {isLoading && !error && loadingPanner}
      {!isLoading && !error && (
        <>
          <Navbar changeColor={true} isShadow={false} />
          <div className="hidden lg:grid max-w-[1240px] mx-auto pt-[9rem] abel grid-cols-9">
            <div className="col-span-1 mx-auto">
              {item?.images.map((img, index) => (
                <div
                  className={`h-[6.25rem] w-[4.063rem] mb-4 img-select ${
                    index !== currentIndex ? "bg-gray-300/50" : ""
                  } `}
                  key={index}
                >
                  <img
                    src={img}
                    alt=""
                    onClick={() => {
                      ImgClickHandler(index);
                    }}
                    className="w-full h-full cursor-pointer  overflow-hidden mix-blend-overlay "
                  />
                </div>
              ))}
            </div>
            <div className="col-span-4 mr-auto">
              <div className="w-[30rem] h-[45.5rem] img-element-page overflow-hidden img-select">
                <TransitionGroup>
                  <CSSTransition
                    key={currentIndex}
                    timeout={300}
                    classNames={"blur"}
                  >
                    <LazyLoadImage
                      effect="blur"
                      src={item?.images[currentIndex]}
                      alt=""
                      className="w-[30rem] h-[45.5rem] overflow-hidden img-element"
                    />
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
            <div className="col-span-4 mr-auto">
              <div className="pb-[4rem] border-b-[1px]">
                <h1 className="text-3xl mb-4 uppercase">{item?.itemName}</h1>

                <h1 className="text-3xl mb-4 ">&euro; {item?.price}</h1>
                <div>
                  <h3 className="font-bold mb-2 ">Size</h3>
                  <ul className="flex flex-row space-x-8 text-center mb-8">
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
                <div className="flex justify-start items-center space-x-4">
                  <button
                    onClick={addToCartHandler}
                    className={`px-36 text-center py-4  hover:bg-white hover:text-black border-[1px] border-mostlyblack bg-mostlyblack text-white  hover:bg-green-dark focus:outline-none  uppercase select-size ${
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
              </div>
              <div className="py-8">
                <h3 className="font-bold mb-2 tracking-wide border-b-[2px] border-mostlyblack inline-block">
                  Description
                </h3>
                <p>{item?.description}</p>
              </div>
              <div className="py-4 flex flex-row justify-start space-x-[8rem]">
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
                      {item?.availableColors.map((color, index) => (
                        <li
                          className="flex space-x-2  items-center"
                          key={index}
                        >
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
          </div>
          <div className="lg:hidden">
            <ItemImageSlider
              duration={10000}
              description={item.description}
              itemName={item.itemName}
              price={item.price}
              slides={item.images}
              showArrows={true}
              availableColors={item.availableColors}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ItemPage;

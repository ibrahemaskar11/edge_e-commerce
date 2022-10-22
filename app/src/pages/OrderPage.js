import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularLoading from "../UI/CircularLoading";
import Navbar from "../components/Navbar";
import AuthContext from "../store/auth/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import OrderPageItem from "../components/OrderPageItem";
import { AiOutlineRight } from "react-icons/ai";
import { cartActions } from "../store/cart/cartSlice";

const OrderPage = () => {
  const [error, setError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();

  const history = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const isOverflow = cartItems.length > 4;
  useEffect(() => {
    if (!isLoggedIn) {
      history("/auth/login");
    }
  }, [isLoggedIn, cartItems, history]);
  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(
          `https://edgee-commercebackend-production.up.railway.app/api/auth/user/${userId}`
        );
        const data = await res.json();
        setUsername(data.user.username);
        setEmail(data.user.email);
        setPhoneNumber(data.user.phoneNumber);
        setAddress(data.user.billingAddress);
        setCity(data.user.city);
        setPostalCode(data.user.postalCode);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchUserData();
  }, []);
  const usernameChangeHandler = (e) => {
    setUsernameError(false);
    setErrorMessage("");

    setUsername(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmailError(false);
    setErrorMessage("");

    setEmail(e.target.value);
  };
  const phoneNumberChangeHandler = (e) => {
    setPhoneNumberError(false);
    setErrorMessage("");

    setPhoneNumber(e.target.value);
  };
  const addressChangeHandler = (e) => {
    setAddressError(false);
    setErrorMessage("");

    setAddress(e.target.value);
  };
  const cityChangeHandler = (e) => {
    setCityError(false);
    setErrorMessage("");

    setCity(e.target.value);
  };
  const postalCodeChangeHandler = (e) => {
    setPostalCodeError(false);
    setErrorMessage("");

    setPostalCode(e.target.value);
  };

  const submitOrderHandler = async () => {
    let redFlag = false
    try {
      if (username.trim().length === 0) {
        setUsernameError(true);
        redFlag = true
      }
      if (phoneNumber.trim().length === 0) {
        setPhoneNumberError(true);
        redFlag = true
      }
      if (phoneNumber.trim().length !== 11) {
        setPhoneNumberError(true);
        redFlag = true
      }
      if (email.trim().length === 0) {
        setEmailError(true);
        redFlag = true
      }
      if (!email.includes("@")) {
        setEmailError(true);
        redFlag = true
      }
      if (address.trim().length === 0) {
        setAddressError(true);
        redFlag = true
      }
      if (city.trim().length === 0) {
        setCityError(true);
        redFlag = true
      }
      if (postalCode.trim().length === 0) {
        setPostalCodeError(true);
        redFlag = true
      }
      if (cartItems.length === 0) {
        setError(true);
        redFlag = true
      }
      if(redFlag){
        throw new error('invalid input')
      }
      setLoading(true);
      const ownerId = localStorage.getItem("userId");
      const userData = {
        phoneNumber,
        billingAddress: address,
        city,
        postalCode,
        email,
        username,
      };
      const order = {
        ownerId,
        items: cartItems,
        totalAmount,
        totalItems,
        userData,
      };
      const res = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
      if (!res.ok) {
        setError(true);
        throw new error("failed to send order");
      }
      history("/user/orders");
      dispatch(cartActions.emptyCart());
      setLoading(false);
    } catch (error) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setErrorMessage(error);
      setLoading(false);
    }
  };
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  const errorPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center mb-[4rem]">
        <h1 className="text-5xl abel">Something Went Wrong...</h1>
      </div>
    </div>
  );
  return (
    <section id="order-page" className="w-full h-full">
      <Navbar changeColor={true} isShadow={false} />
      {error && !loading && errorPanner}
      {loading && !error && loadingPanner}
      {!loading && !error && (
        <div className="max-w-[1240px] mx-auto py-32">
          <h1 className="text-4xl text-center font-[500] tracking-[0.3rem] abel mb-12">
            Check Out
          </h1>
          <div className="flex flex-col lg:flex-row px-8 space-x-4 mb-12 lg:max-h-[70vh]">
            <div className="grid grid-cols-1 w-full lg:w-[50%] mb-8 lg:mb-0 lg:pr-8 lg:border-r-[1px]">
              {errorMessage && (
                <h3 className="capitalize abel text-xl font-[600] mb-2 text-red-600">
                  Invalid input
                </h3>
              )}
              <div className="col-span-1">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  Name
                </label>
                <input
                  type="text"
                  className={`${
                    usernameError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="fullname"
                  value={username}
                  onChange={usernameChangeHandler}
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`${
                    emailError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="email"
                  value={email}
                  onChange={emailChangeHandler}
                  required
                />
              </div>
              <div className=" col-span-1">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  phone number
                </label>
                <input
                  type="text"
                  className={`${
                    phoneNumberError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={phoneNumberChangeHandler}
                  required
                />
              </div>
              <div className=" col-span-1">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  address
                </label>
                <input
                  type="text"
                  className={`${
                    addressError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="address"
                  value={address}
                  onChange={addressChangeHandler}
                  required
                />
              </div>
              <div className=" col-span-1">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  City
                </label>
                <input
                  type="text"
                  className={`${
                    cityError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="address"
                  value={city}
                  onChange={cityChangeHandler}
                  required
                />
              </div>
              <div className=" col-span-1">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  postal code
                </label>
                <input
                  type="text"
                  className={`${
                    postalCodeError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="postal code"
                  value={postalCode}
                  onChange={postalCodeChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="lg:mb-12">
              <div
                className={`flex flex-col h-full ${
                  isOverflow ? "lg:overflow-y-scroll" : ""
                } `}
              >
                {cartItems?.map((item) => (
                  <OrderPageItem item={item} key={item._id + item.size} />
                ))}
              </div>
              <div className="grid  grid-cols-4 lg:grid-cols-8 abel mt-4 px-4 text-[14px] lg:text-[17px]">
                <h1 className="text-xl capitalize col-span-3 lg:col-span-6 pl-1 tracking-[0.2rem]">
                  Subtotal
                </h1>
                <h3 className="text-xl col-span-1 lg:col-span-2 pr-0 lg:pr-4 mx-auto">
                  {totalAmount.toFixed(2)} &euro;
                </h3>
              </div>
            </div>
          </div>
          <div>
            <div className="mx-auto text-center flex  justify-center mb-4">
              <Link
                to="/cart"
                className="border-r-[1px] cursor-pointer border-blackish px-4 abel hover:text-black/60 "
              >
                Shopping Cart
              </Link>
              <Link
                to="/selection"
                className="px-4 cursor-pointer hover:text-black/60 abel "
              >
                Continue Shopping
              </Link>
            </div>
            <div className="mx-auto">
              <button
                onClick={submitOrderHandler}
                to="/cart/order"
                className="bg-black/90 w-[16rem] lg:w-[24rem] mx-auto cursor-pointer hover:bg-white hover:text-black border-2 border-black text-center active:bg-white  active:text-black font-[400] text-white py-4 uppercase flex justify-center items-center lg:tracking-[0.3rem] text-[16px] btn-hover"
              >
                Proceed to Check Out
                <span>
                  <AiOutlineRight size="16" className=" ml-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthContext from "../store/auth/AuthContext";
import CircularLoading from "../UI/CircularLoading";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const history = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);
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


  useEffect(() => {
    if (!isLoggedIn) {
      history("/auth/login");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(
          `https://edgee-commercebackend-production.up.railway.app/api/auth/user/${userId}`
        );
        const data = await res.json();
        setUser(data.user);
        setUsername(data.user.username);
        setEmail(data.user.email);
        setPhoneNumber(data.user.phoneNumber);
        setAddress(data.user.billingAddress);
        setCity(data.user.city);
        setPostalCode(data.user.postalCode);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  const onSubmitHandler = async () => {
    const authToken = localStorage.getItem("authToken");
    setLoading(true);
    try {
      let redFlag = false
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
      if(redFlag){
        throw new error('invalid input')
      }
      const res = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/auth/user/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            username,
            email,
            phoneNumber,
            billingAddress: address,
            city,
            postalCode,
          }),
        }
      );
      const data = await res.json();
      const expirationTime = new Date(
        new Date().getTime() + data.expireIn
      ).toISOString();
      login(data.token, data.user, expirationTime);
      history(0);
    } catch (error) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setErrorMessage('invalid input');
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
    <>
      <Navbar changeColor={true} isShadow={false} />
      {loading && loadingPanner}
      {!loading && (
        <section className="py-[80px]">
          <img
            src={
              "https://res.cloudinary.com/dvywdmp9y/image/upload/v1665195016/accountImg_ziizym.jpg"
            }
            className="hidden lg:block w-full"
            alt=""
          />
          <div className="py-12 max-w-[960px] mx-auto">
            <h1 className="text-4xl font-[500] text-center tracking-[0.3rem] abel mb-12">
              Personal Details
            </h1>
            {errorMessage && (
              <h3 className="capitalize text-center abel text-xl font-[600] mb-12 text-red-600">
                Invalid input
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              <div className="mx-8">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  Name
                </label>
                <input
                  type="text"
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4  ${usernameError && "bg-red-400"}`}
                  name="fullname"
                  value={username}
                  onChange={usernameChangeHandler}
                  required
                />
              </div>
              <div className="mx-8">
                <label
                  htmlFor=""
                  className="capitalize text-black abel text-xl font-[500]"
                >
                  Email
                </label>
                <input
                  type="email"
                  className={` ${
                    emailError && "bg-red-400"
                  } block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 `}
                  name="email"
                  value={email}
                  onChange={emailChangeHandler}
                  required
                />
              </div>
              <div className="mx-8 mt-12">
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
              <div className="mx-8 mt-12">
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
              <div className="mx-8 mt-12">
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
              <div className="mx-8 mt-12">
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
            <div className="mx-auto text-center flex  justify-center mt-8">
              <Link
                to="/cart"
                className="border-r-[1px] cursor-pointer abel border-blackish px-4 hover:text-black/60 "
              >
                Shopping Cart
              </Link>
              <Link
                to="/selection"
                className="px-4 cursor-pointer abel hover:text-black/60 "
              >
                Continue Shopping
              </Link>
            </div>
            <div className="mx-auto flex justify-center items-center">
                <button
                  onClick={onSubmitHandler}
                  className={` px-9 my-8 text-center capitalize py-3  hover:bg-mostlyblack bg-black text-white text-xl hover:bg-green-dark focus:outline-none mb-4 abel`}
                >
                  Edit personal details
                </button>
          
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfilePage;

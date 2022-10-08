import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthContext from "../store/auth/AuthContext";
import CircularLoading from "../UI/CircularLoading";
import profileImg from "../assets/accountImg.jpg";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const history = useNavigate();
  const { login,isLoggedIn } = useContext(AuthContext)
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const phoneNumberChangeHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };
  const cityChangeHandler = (e) => {
    setCity(e.target.value);
  };
  const postalCodeChangeHandler = (e) => {
    setPostalCode(e.target.value);
  };

  useEffect(()=>{
    if(!isLoggedIn){
      history('/auth/login')
    }
  },[isLoggedIn])
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
      setError(true);
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
      {error && errorPanner}
      {loading && !error && loadingPanner}
      {!loading && !error && (
        <section className="py-[80px]">
          <img src={profileImg} className="hidden lg:block w-full" alt="" />
          <div className="py-12 max-w-[960px] mx-auto">
            <h1 className="text-4xl font-[500] text-center tracking-[0.3rem] abel mb-12">
              Personal Details
            </h1>
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
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 ${
                    !change ? " cursor-default" : ""
                  }`}
                  name="fullname"
                  value={username}
                  onChange={usernameChangeHandler}
                  required
                  disabled={!change}
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
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 ${
                    !change ? " cursor-default" : ""
                  }`}
                  name="email"
                  value={email}
                  onChange={emailChangeHandler}
                  required
                  disabled={!change}
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
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 ${
                    !change ? " cursor-default" : ""
                  }`}
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={phoneNumberChangeHandler}
                  required
                  disabled={!change}
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
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 ${
                    !change ? " cursor-default" : ""
                  }`}
                  name="address"
                  value={address}
                  onChange={addressChangeHandler}
                  required
                  disabled={!change}
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
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 ${
                    !change ? " cursor-default" : ""
                  }`}
                  name="address"
                  value={city}
                  onChange={cityChangeHandler}
                  required
                  disabled={!change}
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
                  className={`block  border-b-2 placeholder:text-black abel text-xl bg-transparent border-blackish w-full outline-none py-2 px-3 mb-4 ${
                    !change ? " cursor-default" : ""
                  }`}
                  name="postal code"
                  value={postalCode}
                  onChange={postalCodeChangeHandler}
                  required
                  disabled={!change}
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
              {!change && (
                <button
                  onClick={() => {
                    setChange(true);
                  }}
                  className={` px-9 my-8 text-center capitalize py-3  hover:bg-mostlyblack bg-black text-white text-xl hover:bg-green-dark focus:outline-none mb-4 abel`}
                >
                  Edit personal details
                </button>
              )}
              {change && (
                <div className="flex flex-col">
                  <button
                    onClick={onSubmitHandler}
                    className={` px-24 my-8 text-center capitalize py-3  hover:bg-mostlyblack bg-black text-white text-xl hover:bg-green-dark focus:outline-none mb-4 abel`}
                  >
                    Submit
                  </button>
                  <a
                    onClick={() => {
                      setChange(false);
                    }}
                    className="px-4 cursor-pointer text-center abel hover:text-black/60 "
                  >
                    Cancel
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfilePage;

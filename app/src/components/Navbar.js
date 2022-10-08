import { useRef, useState, useContext, useEffect } from "react";
import { BsSearch, BsHeart, BsHeartFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth/AuthContext";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const [showNav, setShowNav] = useState(false);
  const [menDropDown, setMenDropDown] = useState(false);
  const [womenDropDown, setWomenDropDown] = useState(false);
  const [accountDropDown, setAccountDropDown] = useState(false);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { logout } = useContext(AuthContext);
  const history = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const menDropDownRef = useRef();
  const womenDropDownRef = useRef();
  const wishListItems = useSelector((state) => state.wishList.wishListItems);
  const wishListIsEmpty = wishListItems.length === 0;
  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (
          menDropDownRef.current &&
          menDropDownRef.current.contains(e.target)
        ) {
          setMenDropDown((prevState) => !prevState);
        } else {
          setMenDropDown(false);
        }
        if (
          womenDropDownRef.current &&
          womenDropDownRef.current.contains(e.target)
        ) {
          setWomenDropDown((prevState) => !prevState);
        } else {
          setWomenDropDown(false);
        }
      },
      true
    );
  }, [menDropDownRef, womenDropDownRef]);
  const logoutHandler = () => {
    console.log("clicked");
    logout();
    history("/auth/login");
    history(0);
  };
  const accountDropDownContent = !isLoggedIn ? (
    <ul className="absolute z-1 rounded-md drop-shadow-2xl text-black bg-white text-sm uppercase mt-[9rem] ">
      <li className="py-3 px-4 w-full ">
        <Link
          to="/auth/login"
          onClick={() => {
            setAccountDropDown(false);
          }}
          className="hover:text-gray-600"
        >
          login
        </Link>
      </li>
      <li className="py-3 px-4 w-full ">
        <Link
          to="/auth/register"
          onClick={() => {
            setAccountDropDown(false);
          }}
          className="hover:text-gray-600"
        >
          register
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="absolute z-1 rounded-md drop-shadow-2xl text-black bg-white text-sm uppercase mt-[11rem] ">
      <li className="py-3 px-4 w-full ">
        <Link
          onClick={() => {
            setAccountDropDown(false);
          }}
          to="/user"
          className="hover:text-gray-600"
        >
          Account
        </Link>
      </li>
      <li className="py-3 px-4 w-full ">
        <Link
          to="/user/orders"
          onClick={() => {
            setAccountDropDown(false);
          }}
          className="hover:text-gray-600"
        >
          Orders
        </Link>
      </li>
      <li className="py-3 px-4 w-full ">
        <button
          className="hover:text-gray-600 text-sm uppercase"
          onClick={logoutHandler}
        >
          Log out
        </button>
      </li>
    </ul>
  );
  let navClassNameBg =
    showNav || props.changeColor
      ? "bg-gray-100 drop-shadow-xl opacity-[0.97]"
      : "";
  const navCartClassNameBg = !props.isShadow ? " opacity-[0.97] bg-white" : "";
  const navClassNameText =
    showNav || props.changeColor ? "text-black" : "text-white";
  const navbarHoverColor = props.changeColor
    ? "hover:text-gray-600"
    : "hover:text-gray-300";
  return (
    <nav
      className={`w-full ${
        !props.isShadow ? navCartClassNameBg : navClassNameBg
      } h-[80px] fixed z-10`}
    >
      <div className=" flex justify-between items-center py-4 px-8">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className={`superior ${navClassNameText} text-4xl md:text-[2.75rem] mr-[4rem] cursor-pointer self-center lg:pl-4`}
          >
            edge.
          </Link>
          <div className="hidden lg:flex flex-row justify-center items-center px-4 self-center">
            <ul
              className={`flex flex-row justify-center items-center space-x-12 uppercase font-semibold ${navClassNameText}`}
            >
              <li>
                <Link className={`${navbarHoverColor}`} to="/">
                  Home
                </Link>
              </li>
              <li ref={menDropDownRef} className="">
                <button
                  className={`${navbarHoverColor} flex items-center uppercase`}
                  onClick={() => {
                    setWomenDropDown(false);
                    setAccountDropDown(false);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={menDropDown ? true : false}
                >
                  Men
                  {!menDropDown ? (
                    <span>
                      <BiChevronDown size="24" />
                    </span>
                  ) : (
                    <span>
                      <BiChevronUp className="mt-[4px]" size="24" />
                    </span>
                  )}
                </button>
                {menDropDown && (
                  <ul className="absolute z-1 py-2 px-1 bg-white drop-shadow-2xl  rounded-md min-w-[160px] box-shadow-2xl text-black  text-sm uppercase mt-2">
                    <li className="py-3 px-4 w-full">
                      <Link
                        to="/men/"
                        onClick={() => {
                          setMenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        New Arrivals
                      </Link>
                    </li>

                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/men/T-shirt"
                        onClick={() => {
                          setMenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        T-shirts
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/men/Shirt"
                        onClick={() => {
                          setMenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Shirts
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/men/Tie-Dye"
                        onClick={() => {
                          setMenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Tie-Dye
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/men/Jeans"
                        onClick={() => {
                          setMenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Jeans
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li ref={womenDropDownRef}>
                <button
                  className={`${navbarHoverColor} flex items-center uppercase`}
                  onClick={() => {
                    setMenDropDown(false);
                    setAccountDropDown(false);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={menDropDown ? true : false}
                >
                  Women
                  {!womenDropDown ? (
                    <span>
                      <BiChevronDown size="24" />
                    </span>
                  ) : (
                    <span>
                      <BiChevronUp className="mt-[4px]" size="24" />
                    </span>
                  )}
                </button>
                {womenDropDown && (
                  <ul className="absolute z-1 py-2 px-1 bg-white drop-shadow-2xl  rounded-md min-w-[160px] box-shadow-2xl text-black  text-sm uppercase mt-2">
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        New Arrivals
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/T-Shirt"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        T-shirts
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/T-Shirt"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Shirts
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/Tops"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Tops
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/Tie-Dye"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Tie-Dye
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/Pants"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Pants
                      </Link>
                    </li>
                    <li className="py-3 px-4 w-full ">
                      <Link
                        to="/women/Dress"
                        onClick={() => {
                          setWomenDropDown(false);
                        }}
                        className="hover:text-gray-600"
                      >
                        Dresses
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a className={`${navbarHoverColor}`} href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className={`${navbarHoverColor}`} href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={` hidden lg:flex flex-row justify-center items-center  px-4 ${navClassNameText}`}
        >
          <Link to="/search" className={`${navbarHoverColor} pr-8`}>
            <BsSearch size="24" className="" />
          </Link>

          {isLoggedIn && (
            <Link to="/user/wish-list" className={`pr-8 ${navbarHoverColor}`}>
              {wishListIsEmpty && <BsHeart size="24" className="" />}
              {!wishListIsEmpty && (
                <BsHeartFill size="24" className="text-red-600" />
              )}
            </Link>
          )}

          {totalItems ? (
            <Link to="/cart" className={`pr-8 ${navbarHoverColor}`}>
              <div className="relative">
                <HiOutlineShoppingBag
                  size="24"
                  className={`${navClassNameText}`}
                />
                <span className="bg-transparent bg-green-400 text-black/80 font-[700] w-[24px] h-[24px] text-center circle rounded-full absolute z-1">
                  {totalItems}
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/cart" className={`pr-8 ${navbarHoverColor}`}>
              <HiOutlineShoppingBag
                size="24"
                className={`${navClassNameText}`}
              />
            </Link>
          )}

          <div className="flex justify-center items-center font-semibold ">
            <button
              className="flex items-center "
              aria-haspopup="menu"
              aria-expanded={menDropDown ? true : false}
              onClick={() => {
                setMenDropDown(false);
                setWomenDropDown(false);
                setAccountDropDown((prevState) => !prevState);
              }}
            >
              <VscAccount size="24" className={`${navbarHoverColor}`} />
              {!accountDropDown ? (
                <span>
                  <BiChevronDown size="24" />
                </span>
              ) : (
                <span>
                  <BiChevronUp className="mt-[4px]" size="24" />
                </span>
              )}
            </button>
            {accountDropDown && accountDropDownContent}
          </div>
        </div>
        <div className="lg:hidden flex justify-center items-center">
          <div className="flex items-center justify-center pt-2">
            {isLoggedIn && (
              <Link
                to="/user/wish-list"
                className={`pr-3 ${navClassNameText} ${navbarHoverColor}`}
              >
                {wishListIsEmpty && <BsHeart size="24" className="" />}
                {!wishListIsEmpty && (
                  <BsHeartFill size="24" className="text-red-600" />
                )}
              </Link>
            )}

            {totalItems ? (
              <Link to="/cart" className={`pr-4 ${navbarHoverColor}`}>
                <div className="relative">
                  <HiOutlineShoppingBag
                    size="24"
                    className={`${navClassNameText}`}
                  />
                  <span className="bg-transparent bg-green-400 text-black/80 font-[700] w-[24px] h-[24px] text-center circle rounded-full absolute z-1">
                    {totalItems}
                  </span>
                </div>
              </Link>
            ) : (
              <Link to="/cart" className={`pr-4 ${navbarHoverColor}`}>
                <HiOutlineShoppingBag
                  size="24"
                  className={`${navClassNameText}`}
                />
              </Link>
            )}
            <div
              className={`flex justify-center items-center pr-2 font-semibold ${navClassNameText}`}
            >
              <button
                className="flex items-center"
                aria-haspopup="menu"
                aria-expanded={menDropDown ? true : false}
                onClick={() => {
                  setAccountDropDown((prevState) => !prevState);
                  setShowNav(false);
                }}
              >
                <VscAccount size="24" />
                {!accountDropDown ? (
                  <span>
                    <BiChevronDown size="24" />
                  </span>
                ) : (
                  <span>
                    <BiChevronUp className="mt-[4px]" size="24" />
                  </span>
                )}
              </button>
              {accountDropDown && isLoggedIn && (
                <ul className="absolute z-1 rounded-md drop-shadow-2xl text-black bg-white text-sm uppercase mt-[11rem] ">
                  <li className="py-3 px-4 w-full ">
                    <Link
                      onClick={() => {
                        setAccountDropDown(false);
                      }}
                      to="/user"
                      className="hover:text-gray-600"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="py-3 px-4 w-full ">
                    <Link
                      to="/user/orders"
                      onClick={() => {
                        setAccountDropDown(false);
                        
                      }}
                      className="hover:text-gray-600"
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="py-3 px-4 w-full ">
                    <button
                      className="hover:text-gray-600 text-sm uppercase"
                      onClick={logoutHandler}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              )}
              {accountDropDown && !isLoggedIn && (
                <ul className="absolute z-1 rounded-md drop-shadow-2xl text-black bg-white text-sm uppercase mt-[8rem] ">
                  <li className="py-3 px-4 w-full ">
                    <Link
                      to="/auth/login"
                      onClick={() => {
                        setAccountDropDown(false);
                      }}
                      className="hover:text-gray-600"
                    >
                      login
                    </Link>
                  </li>
                  <li className="py-3 px-4 w-full ">
                    <Link
                      to="/auth/register"
                      onClick={() => {
                        setAccountDropDown(false);
                      }}
                      className="hover:text-gray-600"
                    >
                      register
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          {!showNav && (
            <IoIosMenu
              size="32"
              onClick={() => {
                setShowNav((prevState) => !prevState);
                setAccountDropDown(false);
              }}
              className={` mt-2 cursor-pointer ${navClassNameText}`}
            />
          )}
          {showNav && (
            <IoCloseOutline
              size="32"
              onClick={() => {
                setShowNav((prevState) => !prevState);
                setAccountDropDown(false);
              }}
              className={` mt-2 cursor-pointer ${navClassNameText}`}
            />
          )}
        </div>
      </div>
      {showNav && (
        <div
          className={`flex flex-col z-10 absolute w-full px-8 box-shadow-xl ${
            !props.isShadow ? navCartClassNameBg : navClassNameBg
          } lg:hidden`}
        >
          <ul className="flex flex-col justify-center items-center text-lg text-black space-y-8 font-semibold capitalize py-2 pb-6">
            <li className="w-full text-center pb-2 border-b-2 border-gray-200">
              <Link className={"hover:text-gray-600"} to="/">
                Home
              </Link>
            </li>
            <li className="w-full text-center pb-2 border-b-2 border-gray-200">
              <Link to="/men/" className="hover:text-gray-600">
                Men
              </Link>
            </li>
            <li className="w-full text-center pb-2 border-b-2 border-gray-200">
              <Link to="/women/" className="hover:text-gray-600">
                Women
              </Link>
            </li>
            <li className="w-full text-center pb-2 border-b-2 border-gray-200">
              <a className="hover:text-gray-600" href="#">
                About Us
              </a>
            </li>
            <li className="w-full text-center pb-2 border-b-2 border-gray-200">
              <a className="hover:text-gray-600" href="#">
                Contact Us
              </a>
            </li>
            <li className="w-full flex items-center space-x-4">
              <div className="flex justify-center items-center mr-6 border-b-2 border-black w-full ">
                <input
                  onClick={() => {
                    history("/search");
                  }}
                  type="text"
                  placeholder="what are you looking for?"
                  className="bg-transparent capitalize placeholder:text-mostlyblack py-1 px-2 cursor-pointer outline-none w-[20rem] text-start font-semibold mr-2 border-r-2"
                />
                <button>
                  <AiOutlineRight
                    size="24"
                    className="mb-1 cursor-pointer hover:text-gray-600"
                  />
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

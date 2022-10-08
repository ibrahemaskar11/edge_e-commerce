import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import CircularLoading from "../UI/CircularLoading";
import { useSelector } from "react-redux";
import WishListProductCard from "../components/WishListProductCard";
import AuthContext from "../store/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const WishListPage = () => {
  const wishListItems = useSelector((state) => state.wishList.wishListItems);
  const isLoading = useSelector((state) => state.wishList.isLoading);
  const {isLoggedIn} = useContext(AuthContext)
  const error = useSelector((state) => state.wishList.error);
  const history = useNavigate()
  useEffect(() => {
    if(!isLoggedIn){
        history('/auth/login')
    }

  }, [isLoggedIn, history]);
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  const errorPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center">
        <h1 className="text-5xl abel mb-8">Error 404</h1>
        <h1 className="text-5xl abel">Something went wong</h1>
      </div>
    </div>
  );
  const emptyPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center">
        <h1 className="text-5xl abel">Wish List is Empty</h1>
      </div>
    </div>
  );

  const isEmpty = wishListItems.length === 0;
  return (
    <section id="men-page" className=" w-full ">
      <Navbar changeColor={true} isShadow={false} />
      {error && errorPanner}
      {isLoading && !error && loadingPanner}
      {!isLoading && !error && isEmpty && emptyPanner}
      {!isLoading && !error && !isEmpty &&  (
        <div className="w-full h-full pt-[7rem]">
          {!isEmpty && <h1 className="text-4xl font-[500] text-center tracking-[0.3rem] abel">
            Wish List
          </h1>}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto py-12 justify-center items-center xl:px-[10rem] text-center`}
          >
            {wishListItems?.map((item, index) => (
              <div className="mb-4 self-center mx-auto" key={item._id}>
                <WishListProductCard
                  key={item._id}
                  item={item}
                  imgClassName={"img-element"}
                  pageSrc="men"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default WishListPage;

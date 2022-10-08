import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineRight } from "react-icons/ai";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart/cartSlice";
import CircularLoading from "../UI/CircularLoading";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [error, setError] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const subTotal = +totalAmount.toFixed(2);
  const dispatch = useDispatch();
  const history = useNavigate();
  const isCartEmpty = cartItems.length === 0;
  const emptyCartHandler = () => {
    dispatch(cartActions.emptyCart());
  };
  const loadingPanner = (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <CircularLoading panner={"Loading"} />
    </div>
  );
  return (
    <section id="cart" className="min-h-[100vh] w-full">
      <Navbar changeColor={true} isShadow={false} />
      {isLoading && loadingPanner}
      {!isLoading && (
        <>
          <div className=" md:max-w-[1000px] mx-auto justify-center items-center flex flex-col py-[6.5rem] md:py-[8rem] px-2 md:px-4">
            <h1 className="text-4xl font-[500] tracking-[0.3rem] abel mb-12">
              Shopping Cart
            </h1>
            <div className="w-full md:px-[3.5rem] abel">
              <div className="grid grid-cols-8 border-b-[1px] text-[17px] border-blackish pb-1 text-blackish mb-8 px-2 md:px-4">
                <h3 className="col-span-4">Product</h3>
                <h3 className="col-span-1">Price</h3>
                <h3 className="col-span-2 text-center">amount</h3>
                <h3 className="col-span-1 ml-auto">Total</h3>
              </div>
              {!isLoading && error && isCartEmpty && (
                <div className=" flex justify-center items-center flex-col">
                  <h1 className="my-12 text-5xl text-center">Cart is empty</h1>
                  <h1 className="mb-12 text-5xl text-center">
                    You will need to add items first
                  </h1>
                </div>
              )}
              {!isCartEmpty &&
                !error &&
                cartItems?.map((item) => (
                  <CartItem item={item} key={item._id + item.size} />
                ))}
              {isCartEmpty && !error && (
                <div className=" flex justify-center items-center">
                  <h1 className="my-12 text-5xl text-center">Cart is empty</h1>
                </div>
              )}
              <div className="mx-auto text-center flex  justify-center mb-8">
                <a
                  onClick={emptyCartHandler}
                  className="border-r-[1px] cursor-pointer border-blackish px-4 hover:text-black/60 "
                >
                  Empty Cart
                </a>
                <Link
                  to="/selection"
                  className="px-4 cursor-pointer hover:text-black/60 "
                >
                  Continue Shopping
                </Link>
              </div>
              <div className="py-3 flex justify-between border-t-[1px] border-b-[1px] border-blackish mb-8 px-2 md:px-4">
                <h3 className="text-2xl tracking-[0.2rem]">Subtotal</h3>
                <h3 className="text-2xl">{subTotal} &euro;</h3>
              </div>
              <div className="mx-auto">
                <button
                  onClick={() => {
                    if (cartItems.length === 0) {
                      setError(true);
                      return;
                    } else {
                      history("/cart/order");
                    }
                  }}
                  className="bg-black/90 w-[16rem] md:w-[16rem] mx-auto cursor-pointer hover:bg-white hover:text-black border-2 border-black text-center active:bg-white  active:text-black font-[400] text-white py-3 uppercase flex justify-center items-center sm:tracking-[0.3rem] text-[18px] btn-hover"
                >
                  Check Out
                  <span>
                    <AiOutlineRight size="16" className=" ml-2" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;

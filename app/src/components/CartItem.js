import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart/cartSlice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const total = (item.price * item.amount).toFixed(2);
  const lastImgIndex = item.images.length - 1;
  const history =useNavigate()
  const target = item.category === "Men" ? 'men' : 'women'
  
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({item}));
    
    
  };
  const removeFromCartHandler = () => {
    const removedItem = {
      ...item,
      size: item.size
    };
    dispatch(cartActions.removeFromCart({item:removedItem}));
  };
  const removeItemHandler = ()=>{
    const removedItem = {
      ...item,
      size: item.size,
    };
    dispatch(cartActions.removeItem({item:removedItem}))
  }
  
  return (
    <div className="grid grid-cols-8 text-[14px] md:text-[17px] mb-12 text-blackish px-4">
      <div className="col-span-4">
        <div className="flex flex-start items-center">
          <div className="w-[4.125rem] h-[4.875rem] mr-8 cursor-pointer">
            <img onClick={()=>{
              history(`/${target}/item/${item._id}`)
            }} src={item.images[lastImgIndex]} alt=""/>
          </div>
          <div className="flex flex-col  items-start justify-start mb-4 text-[14px] md:text-[16px]">
            <h3 className="mb-2 font-bold capitalize">{item.itemName}</h3>
            <h3>{item.size}</h3>
          </div>
        </div>
      </div>
      <div className="col-span-1 pl-1 mt-2">
        <h3>{item.price} &euro;</h3>
      </div>
      <div className="col-span-2 flex flex-col ">
        <div className="flex border-[1px] border-gray-300 text-center mx-auto mb-2">
          <button className="text-center px-2 md:px-4" onClick={removeFromCartHandler}>
            <span className="">
              <AiOutlineMinus size="12"  />
            </span>
          </button>
          <h1
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "1")}
            className="w-[1rem] md:w-[2rem] text-center py-3 text-[15px] placeholder:text-blackish text-blackish bg-transparent outline-none"
          >
            {item.amount}
          </h1>
          <button className="text-center px-2 md:px-4" onClick={addToCartHandler}>
            <span className="">
              <AiOutlinePlus size="12"  />
            </span>
          </button>
        </div>
        <a
          onClick={removeItemHandler}
          className="underline mx-auto text-[14px]  cursor-pointer text-blackish hover:text-black/60 "
        >
          Remove
        </a>
      </div>
      <div className="col-span-1 ml-auto mt-2">{total} &euro;</div>
    </div>
  );
};

export default CartItem;

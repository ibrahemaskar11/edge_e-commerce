import React from "react";
import { useNavigate } from "react-router-dom";

const OrderPageItem = ({ item }) => {
  const history = useNavigate();
  const target = item.category.toLowerCase();
  const lastImgIndex = item.images.length - 1;
  const subTotal = (item.price * item.amount).toFixed(2);

  return (
    <div className="w-full grid grid-cols-4 md:grid-cols-8 text-[14px] md:text-[17px] mb-12 text-blackish px-4 abel">
      <div className="flex flex-start items-center col-span-4">
        <div className="w-[4.125rem] h-[4.875rem] mr-8 cursor-pointer">
          <img
            onClick={() => {
              history(`/${target}/item/${item._id}`);
            }}
            src={item?.images[lastImgIndex]}
            alt=""
          />
        </div>
        <div className="flex flex-col  items-start justify-start mb-4 text-[14px] md:text-[14px]">
          <h3 className="mb-2 font-bold capitalize">{item.itemName}</h3>
          <h3>{item.size}</h3>
          <h3>{item.price} &euro;</h3>
        </div>
      </div>
      <div className="col-span-2 pl-16 lg:pl-5 md:pl-1 mx-auto">
        <h3>{item.amount}</h3>
      </div>
      <div className="col-span-2 pl-6 md:pl-1 mx-auto">
        <h3>{subTotal} &euro;</h3>
      </div>
    </div>
  );
};

export default OrderPageItem;

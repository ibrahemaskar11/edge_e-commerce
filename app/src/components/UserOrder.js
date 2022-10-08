import React from 'react'
import UserOrdersPageItem from './UserOrdersPageItem'

const UserOrder = ({order}) => {
  return (
    <div className="flex flex-col mb-12">
      <h1 className="text-2xl mx-4  font-[500] tracking-[0.3rem] abel mb-2">
        {order.date}
      </h1>
      <div className="max-h-[30vh] overflow-y-auto">
        {order.items.map((item) => (
          <UserOrdersPageItem item={item} key={item.cartId} />
        ))}
      </div>
        <div className="grid  grid-cols-4 lg:grid-cols-8 abel mt-4 px-4 text-[14px] lg:text-[17px]">
          <h1 className="text-2xl capitalize col-span-3 lg:col-span-6 pl-1 tracking-[0.2rem]">
            Subtotal
          </h1>
          <h3 className="text-2xl col-span-1 lg:col-span-2 pr-0 lg:pr-4 mx-auto">
            {order.totalAmount.toFixed(2)} &euro;
          </h3>
      </div>
    </div>
  );
}

export default UserOrder
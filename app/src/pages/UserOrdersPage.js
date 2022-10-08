import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth/AuthContext";
import CircularLoading from "../UI/CircularLoading";
import Navbar from "../components/Navbar";
import UserOrder from "../components/UserOrder";
const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      history("/auth/login");
    }
    const fetchOrdersData = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(
          `https://edgee-commercebackend-production.up.railway.app/api/order/${userId}`
        );
        const { userOrders } = await res.json();
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchOrdersData();
  }, [isLoggedIn, history]);
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
  const emptyPanner = (
    <div className="h-[100vh] flex justify-center  items-center w-full flex-col">
      <div className=" text-center mb-[4rem]">
        <h1 className="text-5xl abel ">You Will Need to Make Orders First...</h1>
      </div>
    </div>
  );
  const isEmpty = orders.length === 0
  return (
    <section id="order-page" className="w-full h-full">
      <Navbar changeColor={true} isShadow={false} />
      {error && !loading && errorPanner}
      {loading && !error && loadingPanner}
      {!loading && !error && isEmpty && emptyPanner}
      {!loading && !error && !isEmpty && (
        <div className="max-w-[1240px] mx-auto py-32">
          <h1 className="text-4xl text-center font-[500] tracking-[0.3rem] abel mb-12">
            Orders
          </h1>
          <div>
           {orders.map(order=> <UserOrder key={order._id} order={order}/>)}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserOrdersPage;

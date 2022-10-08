import Selection from "./pages/Selection";
import { useInView } from "react-intersection-observer";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import AuthPage from "./pages/AuthPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "./store/items/itemsActions";
import { useContext, useEffect } from "react";
import ItemPage from "./pages/ItemPage";
import { fetchCartData, updateCartdata } from "./store/cart/cartActions";
import AuthContext from "./store/auth/AuthContext";
import { cartActions } from "./store/cart/cartSlice";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./pages/OrderPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import { wishListActions } from "./store/wishList/wishListSlice";
import WishListPage from "./pages/WishListPage";
import SearchPage from "./pages/SearchPage";
function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const wishListItems = useSelector((state) => state.wishList.wishListItems);
  const changed = useSelector((state) => state.cart.changed);
  const wishListChanged = useSelector(
    (state) => state.wishList.wishListChanged
  );
  const initialized = useSelector((state) => state.cart.initialized);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useContext(AuthContext);
  const fetchLocalCartData = () => {
    dispatch(cartActions.setIsLoading({ isLoading: true }));

    const localCart = localStorage.getItem("cartItems");
    if (!localCart) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("totalAmount", "0");
      localStorage.setItem("totalItems", "0");
      localStorage.setItem("read", true);
    } else {
      const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
      const localTotalAmount = parseFloat(localStorage.getItem("totalAmount"));
      const localTotalItems = parseFloat(localStorage.getItem("totalItems"));
      dispatch(
        cartActions.setCartData({
          cart: {
            items: localCartItems,
            totalAmount: localTotalAmount,
            totalItems: localTotalItems,
          },
        })
      );
    }
    dispatch(cartActions.setIsLoading({ isLoading: false }));
    dispatch(cartActions.setChanged({ changed: false }));
  };
  const updateLocalCartData = (cart) => {
    dispatch(cartActions.setIsLoading({ isLoading: true }));

    localStorage.setItem("cartItems", JSON.stringify(cart.items));
    localStorage.setItem("totalAmount", cart.totalAmount);
    localStorage.setItem("totalItems", cart.totalItems);
    localStorage.setItem("read", true);
    const localCartItems = JSON.parse(localStorage.getItem("cartItems"));
    const localTotalAmount = parseFloat(localStorage.getItem("totalAmount"));
    const localTotalItems = parseFloat(localStorage.getItem("totalItems"));
    dispatch(
      cartActions.setCartData({
        cart: {
          items: localCartItems,
          totalAmount: localTotalAmount,
          totalItems: localTotalItems,
        },
      })
    );
    dispatch(cartActions.setIsLoading({ isLoading: false }));
    dispatch(cartActions.setChanged({ changed: false }));
  };
  const deleteCartLocalData = () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.setItem("totalAmount", 0);
    localStorage.setItem("totalItems", 0);
    localStorage.setItem("read", false);
  };

  useEffect(() => {
    dispatch(fetchItems());
    if (isLoggedIn) {
      const localCart = JSON.parse(localStorage.getItem("cartItems"));
      const read = JSON.parse(localStorage.getItem("read"));

      if (localCart.length > 0 && read) {
        const localTotalAmount = parseFloat(
          localStorage.getItem("totalAmount")
        );
        const localCartItems = parseFloat(localStorage.getItem("totalItems"));
        localStorage.setItem("read", false);
        dispatch(fetchCartData());
        dispatch(
          updateCartdata({
            items: localCart,
            totalAmount: localTotalAmount,
            totalItems: localCartItems,
          })
        );
      } else {
        dispatch(fetchCartData());
      }
    }
    if (!isLoggedIn) {
      fetchLocalCartData();
    }
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (isLoggedIn && changed) {
      dispatch(
        updateCartdata({
          items: cartItems,
          totalAmount,
          totalItems,
        })
      );
    }
    if (!isLoggedIn && changed) {
      updateLocalCartData({
        items: cartItems,
        totalAmount,
        totalItems,
      });
    }
  }, [dispatch, changed, isLoggedIn]);
  useEffect(() => {
    const updateWishList = async () => {
      try {
        if (wishListChanged) {
          dispatch(wishListActions.setIsLoading({ isLoading: true }));
          const userId = localStorage.getItem("userId");
          const res = await fetch(
            `https://edgee-commercebackend-production.up.railway.app/api/wish/remove/${userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                wishList: wishListItems,
              }),
            }
          );
          const data = await res.json();
          dispatch(wishListActions.setWishListItems(data.user.wishList));
          dispatch(wishListActions.setIsLoading({ isLoading: false }));
        }
      } catch (error) {}
    };
    updateWishList();
  }, [wishListChanged]);
  useEffect(() => {
    const fetchUserData = async () => {
      if (changed || isLoggedIn) {
        dispatch(wishListActions.setIsLoading({ isLoading: true }));
        try {
          const userId = localStorage.getItem("userId");
          const res = await fetch(
            `https://edgee-commercebackend-production.up.railway.app/api/auth/user/${userId}`
          );
          const data = await res.json();
          dispatch(wishListActions.setWishListItems(data.user.wishList));
          dispatch(wishListActions.setChanged({ changed: false }));
          dispatch(wishListActions.setIsLoading({ isLoading: false }));
        } catch (error) {
          dispatch(wishListActions.setIsLoading({ isLoading: false }));
          dispatch(wishListActions.setError({ error: false }));
        }
      }
    };
    fetchUserData();
  }, [isLoggedIn]);
  const { ref, inView, entry } = useInView({
    threshold: 0.675,
    initialInView: true,
  });

  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="*" element={<LandingPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="selection" exact element={<Selection />} />
      <Route path="men" exact element={<MenPage />} />
      <Route path="men/:filter" exact element={<MenPage />} />
      <Route path="women" exact element={<WomenPage />} />
      <Route path="women/:filter" exact element={<WomenPage />} />
      <Route path="men/item/:itemId" exact element={<ItemPage />} />
      <Route path="women/item/:itemId" exact element={<ItemPage />} />
      <Route path="user" exact element={<ProfilePage />} />
      <Route path="search" exact element={<SearchPage />} />
      <Route path="cart/order" exact element={<OrderPage />} />
      <Route path="user/wish-list" exact element={<WishListPage />} />
      <Route path="user/orders" exact element={<UserOrdersPage />} />
      <Route path="auth/:authMethod" exact element={<AuthPage />} />
      <Route
        path="auth/forgot-password"
        exact
        element={<ForgotPasswordPage />}
      />
      <Route
        path="auth/reset-password/:resetToken"
        element={<ResetPasswordPage />}
      />
    </Routes>
  );
}

export default App;

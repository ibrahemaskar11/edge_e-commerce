import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");
    dispatch(cartActions.setIsLoading({ isLoading: true }));
    if (!userId) return;
    try {
      const res = await fetch(
        `https://edgee-commercebackend-production.up.railway.app/api/cart/${userId}`
      );
      if (!res.ok) {
        throw new Error("failed to fetch cart items");
      }
      const data = await res.json();
      dispatch(cartActions.setCartData(data));
      dispatch(cartActions.setIsLoading({ isLoading: false }));
      dispatch(cartActions.setChanged({ changed: false }));
    } catch (error) {
      dispatch(cartActions.setError(true));
      dispatch(cartActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const updateCartdata = (cart) => {
  const ownerId = localStorage.getItem("userId");
  const sentCart = {
    ownerId,
    ...cart,
  };
  return async (dispatch) => {
    dispatch(cartActions.setIsLoading({ isLoading: true }));
    try {
      const res = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/cart/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sentCart),
        }
      );
      const data = await res.json();
      dispatch(cartActions.setCartData(data));
      dispatch(cartActions.setIsLoading({ isLoading: false }));
      dispatch(cartActions.setChanged({ changed: false }));
    } catch (error) {
      dispatch(cartActions.setError(true));
      dispatch(cartActions.setIsLoading({ isLoading: false }));
    }
  };
};

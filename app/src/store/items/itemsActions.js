import { itemsActions } from "./itemsSlice";

export const fetchItems = () => {
  return async (dispatch) => {
    dispatch(itemsActions.setIsLoading({ isLoading: true }));
    const fetchData = async () => {
      const response = await fetch(
        "https://edgee-commercebackend-production.up.railway.app/api/items"
      );

      if (!response.ok) {
        throw new Error("Could not fetch items!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const { items } = await fetchData();
      const menItems = items.filter((item) => item.category === "Men");
      const womenItems = items.filter((item) => item.category === "Women");
     
      dispatch(
        itemsActions.setItems({
          items: items || [],
        })
      );
      dispatch(
        itemsActions.setMenItems({
          menItems: menItems || [],
        })
      );
      dispatch(
        itemsActions.setWomenItems({
          womenItems: womenItems || [],
        })
      );
      dispatch(itemsActions.setIsLoading({ isLoading: false }));
    } catch (error) {
      dispatch(itemsActions.setIsLoading({ isLoading: false }));
      dispatch(itemsActions.setError({ error: false }));
    }
  };
};

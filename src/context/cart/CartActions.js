import { useReducer } from "react";
import cartReducer, { cartInitialState } from "./cartReducer";
import { ADD_ITEMS, CLEAR_CART, DELETE_ITEMS, FOOD_FILTERED } from "../types";

const CardActions = () => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addItems = (itemToAdd) => {
    const tmpItems = [...state.cartItems];
    tmpItems.push(itemToAdd);
    dispatch({
      type: ADD_ITEMS,
      payload: tmpItems,
    });
  };

  const deleteItems = (id) => {
    const tmpItems = state?.cartItems?.filter((item) => item?.id !== id);
    dispatch({
      type: DELETE_ITEMS,
      payload: tmpItems,
    });
  };
  const clearCart = (news) => {
    dispatch({
      type: CLEAR_CART,
      payload: [],
    });
  };

  const filterFood = (foodFilter) => {
    dispatch({
      type: FOOD_FILTERED,
      payload: [...foodFilter],
    });
  };

  return {
    cartItems: state.cartItems,
    filterSelected: state.filterSelected,
    addItems,
    deleteItems,
    clearCart,
    filterFood,
  };
};

export default CardActions;

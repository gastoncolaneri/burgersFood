import { foodItems } from "../../data/data";
import {
  ADD_ITEMS,
  CLEAR_CART,
  DELETE_ITEMS,
  FINAL_ITEMS,
  FOOD_FILTERED,
} from "../types";

export const cartInitialState = {
  data: foodItems,
  cartItems: [],
  finalItems: [],
  filterSelected: ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEMS:
      return { ...state, cartItems: payload };
    case CLEAR_CART:
      return { ...state, cartItems: payload };
    case DELETE_ITEMS:
      return { ...state, cartItems: payload };
    case FINAL_ITEMS:
      return { ...state, finalItems: payload };
    case FOOD_FILTERED:
      return { ...state, filterSelected: payload };
    default:
      return state;
  }
};

export default cartReducer;
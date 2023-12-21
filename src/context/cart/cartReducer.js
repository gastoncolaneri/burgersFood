import { foodItems } from "../../data/data";
import {
  ADD_ITEMS,
  CHANGE_QUANTITY_ITEMS,
  CLEAR_CART,
  DELETE_ITEMS,
  FOOD_FILTERED,
  CHANGE_TOTAL_AMOUNT,
  ADD_SPECIAL_NOTES,
} from "../types";

export const cartInitialState = {
  data: foodItems,
  cartItems: [],
  filterSelected: ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"],
  totalAmount: 0,
  specialNotes: "",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEMS:
      return { ...state, cartItems: payload };
    case CHANGE_QUANTITY_ITEMS:
      return { ...state, cartItems: payload };
    case CLEAR_CART:
      return { ...state, cartItems: payload };
    case DELETE_ITEMS:
      return { ...state, cartItems: payload };
    case FOOD_FILTERED:
      return { ...state, filterSelected: payload };
    case CHANGE_TOTAL_AMOUNT:
      return { ...state, totalAmount: payload };
    case ADD_SPECIAL_NOTES:
      return { ...state, specialNotes: payload };
    default:
      return state;
  }
};

export default cartReducer;

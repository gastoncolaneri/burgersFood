import { createContext } from "react";
import { cartInitialState } from "./cartReducer";

const CartContext = createContext(cartInitialState);

export default CartContext;

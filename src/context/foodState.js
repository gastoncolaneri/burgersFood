import { foodItems } from "../data/data";

const initialState = {
  data: foodItems,
  cartItems: [],
  isFilter: false,
  filterSelected: ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"],
  overlayVisible: false,
  userLogged: false,
};

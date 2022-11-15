import { useReducer } from "react";
import { foodItems } from "../data/data";
import FoodContext from "./FoodContext";
import FoodsReducer from "./FoodsReducer";

const FoodState = (props) => {
  const initialState = {
    data: foodItems,
    cartItems: [],
    myOrders: [],
    isFilter: false,
    filterSelected: ["Hamburguesas", "Pizzas", "Complementos", "Bebidas"],
    userLogged: false,
  };

  const [state, dispatch] = useReducer(FoodsReducer, initialState);

  return (
    <FoodContext.Provider
      value={{
        ...initialState,
        cardItems: state.cardItems,
        myOrders: state.myOrders,
        isFilter: state.isFilter,
        filterSelected: state.filterSelected,
        userLogged: state.userLogged,
      }}
    >
      {props.children}
    </FoodContext.Provider>
  );
};

export default FoodState;

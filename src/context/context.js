import React, { createContext, useReducer } from "react";

export const FoodsContext = createContext();
const FoodsReducer = (state, action) => {
  switch (action.type) {
    case "ADD-ITEM":
      break;
    case "DELETE-ITEM":
      break;
    case "CLEAR-CART":
      break;
    default:
      break;
  }
};

export const FoodsProvider = ({ children }) => {
  return (
    <FoodsContext.Provider value={{ prueba: "Prueba" }}>
      {children}
    </FoodsContext.Provider>
  );
};

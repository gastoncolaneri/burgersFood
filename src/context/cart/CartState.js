import CardActions from "./CartActions";
import CartContext from "./CartContext";

const CartState = (props) => {
  const {
    addItems,
    cartItems,
    clearCart,
    deleteItems,
    setFinalItems,
    filterFood,
    filterSelected,
    finalItems,
  } = CardActions();

  const value = {
    addItems,
    cartItems,
    clearCart,
    deleteItems,
    setFinalItems,
    filterFood,
    filterSelected,
    finalItems,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartState;

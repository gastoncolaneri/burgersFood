import CardActions from "./CartActions";
import CartContext from "./CartContext";

const CartState = (props) => {
  const {
    addItems,
    cartItems,
    clearCart,
    deleteItems,
    filterFood,
    filterSelected,
    changeTotalAmount,
    changeQuantityItems,
    totalAmount,
  } = CardActions();

  const value = {
    addItems,
    cartItems,
    clearCart,
    deleteItems,
    filterFood,
    filterSelected,
    changeTotalAmount,
    changeQuantityItems,
    totalAmount,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartState;

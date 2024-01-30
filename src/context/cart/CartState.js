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
    addSpecialNotes,
    specialNotes,
    currentStep,
    setCurrentStep,
    discount,
    setDiscount,
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
    addSpecialNotes,
    specialNotes,
    currentStep,
    setCurrentStep,
    discount,
    setDiscount,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartState;

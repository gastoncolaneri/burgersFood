import { useReducer } from "react";
import cartReducer, { cartInitialState } from "./cartReducer";
import {
  ADD_ITEMS,
  CLEAR_CART,
  DELETE_ITEMS,
  FOOD_FILTERED,
  CHANGE_TOTAL_AMOUNT,
  CHANGE_QUANTITY_ITEMS,
  ADD_SPECIAL_NOTES,
  SET_CURRENT_STEP,
  SET_DISCOUNT,
} from "../types";

const CardActions = () => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addItems = (itemToAdd) => {
    const tmpCartItems = [...state.cartItems];
    const hasIncluded = tmpCartItems.some(
      (value) => value?.id === itemToAdd?.id
    );
    !hasIncluded && tmpCartItems.push(itemToAdd);
    const updateQuantity = (value, index, array) => {
      if (itemToAdd?.id === value?.id) {
        const tmpQuantity = value?.quantity + 1;
        const tmpValue = value?.price;
        return (array[index] = {
          ...value,
          quantity: tmpQuantity,
          totalPrice: tmpQuantity * tmpValue,
        });
      }
      return (array[index] = { ...value, quantity: value?.quantity });
    };

    tmpCartItems.forEach(updateQuantity);

    const tmpTotalAmount = tmpCartItems.reduce(
      (acc, currentValue) => acc + currentValue.totalPrice,
      0
    );

    const updatedTotalAmount =
      state.discount > tmpTotalAmount ? 0 : tmpTotalAmount - state.discount;

    dispatch({
      type: CHANGE_TOTAL_AMOUNT,
      payload: updatedTotalAmount,
    });

    dispatch({
      type: ADD_ITEMS,
      payload: tmpCartItems,
    });
  };

  const changeQuantityItems = ({ quantity, id, price }) => {
    let tmpArray;
    if (quantity === 0) {
      const modifyQuantity = [...state.cartItems].map((item) => {
        if (item?.id === id) {
          deleteItems(id);
          return { ...item, quantity: 0, totalPrice: 0 };
        }
        return item;
      });
      tmpArray = modifyQuantity.filter((item) => {
        return item?.id !== id;
      });
    } else {
      tmpArray = [...state.cartItems].map((item) => {
        if (item?.id === id) {
          return { ...item, quantity: quantity, totalPrice: quantity * price };
        }
        return item;
      });
    }

    const tmpTotalAmount = tmpArray.reduce(
      (acc, currentValue) => acc + currentValue.totalPrice,
      0
    );

    const updatedTotalAmount =
      state.discount > tmpTotalAmount ? 0 : tmpTotalAmount - state.discount;

    dispatch({
      type: CHANGE_TOTAL_AMOUNT,
      payload: updatedTotalAmount,
    });

    if (!tmpArray.length) {
      dispatch({
        type: CLEAR_CART,
        payload: tmpArray,
      });
    } else {
      dispatch({
        type: CHANGE_QUANTITY_ITEMS,
        payload: tmpArray,
      });
    }
  };

  const deleteItems = (id) => {
    const tmpItems = state?.cartItems?.filter((item) => item?.id !== id);
    dispatch({
      type: DELETE_ITEMS,
      payload: tmpItems,
    });
  };
  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const filterFood = (foodFilter) => {
    dispatch({
      type: FOOD_FILTERED,
      payload: [...foodFilter],
    });
  };

  const changeTotalAmount = (totalAmount) => {
    dispatch({
      type: CHANGE_TOTAL_AMOUNT,
      payload: totalAmount,
    });
  };

  const addSpecialNotes = (specialNotes) => {
    dispatch({ type: ADD_SPECIAL_NOTES, payload: specialNotes });
  };

  const setCurrentStep = (step) => {
    dispatch({ type: SET_CURRENT_STEP, payload: step });
  };

  const setDiscount = (discount) => {
    const updatedTotalAmount =
      discount > state.totalAmount ? 0 : state.totalAmount - discount;

    dispatch({
      type: CHANGE_TOTAL_AMOUNT,
      payload: updatedTotalAmount,
    });
    dispatch({ type: SET_DISCOUNT, payload: discount });
  };

  return {
    cartItems: state.cartItems,
    filterSelected: state.filterSelected,
    totalAmount: state.totalAmount,
    specialNotes: state.specialNotes,
    currentStep: state.currentStep,
    discount: state.discount,
    addItems,
    deleteItems,
    clearCart,
    filterFood,
    changeTotalAmount,
    changeQuantityItems,
    addSpecialNotes,
    setCurrentStep,
    setDiscount,
  };
};

export default CardActions;

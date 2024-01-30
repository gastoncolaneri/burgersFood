import { useReducer } from "react";
import paymentReducer, { paymentInitialState } from "./paymentReducer";
import { SET_PAYMENT_INFORMATION } from "../types";

const PaymentActions = () => {
  const [state, dispatch] = useReducer(paymentReducer, paymentInitialState);

  const setPaymentInformation = (paymentInformation) => {
    dispatch({
      type: SET_PAYMENT_INFORMATION,
      payload: paymentInformation,
    });
  };

  return {
    paymentInformation: state.paymentInformation,
    setPaymentInformation,
  };
};

export default PaymentActions;

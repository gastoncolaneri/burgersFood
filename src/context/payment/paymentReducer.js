import { PAYMENT_TYPE } from "../../utils/constants";
import {
  CHECK_PAYMENT_INFORMATION_COMPLETE,
  SET_PAYMENT_INFORMATION,
} from "../types";

export const paymentInitialState = {
  paymentInformation: {
    card: {
      ownerNameCard: "",
      type: "",
      number: null,
      expireDate: "",
      securedCode: null,
    },
    cash: { value: null, isExact: true },
    typePayment: PAYMENT_TYPE[0],
  },
  isPaymentInformationComplete: false,
};

const paymentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PAYMENT_INFORMATION:
      return { ...state, paymentInformation: payload };
    case CHECK_PAYMENT_INFORMATION_COMPLETE:
      return { ...state, isPaymentInformationComplete: payload };
    default:
      return state;
  }
};

export default paymentReducer;

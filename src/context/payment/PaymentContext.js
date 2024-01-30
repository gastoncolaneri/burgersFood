import { createContext } from "react";
import { paymentInitialState } from "./paymentReducer";

const PaymentContext = createContext(paymentInitialState);

export default PaymentContext;

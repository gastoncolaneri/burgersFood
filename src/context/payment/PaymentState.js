import PaymentActions from "./PaymentActions";
import PaymentContext from "./PaymentContext";

const PaymentState = (props) => {
  const { setPaymentInformation, paymentInformation } = PaymentActions();

  const value = {
    setPaymentInformation,
    paymentInformation,
  };

  return (
    <PaymentContext.Provider value={value}>
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import CartContext from "../../context/cart/CartContext";
import {
  STEP_RESUMEN,
  STEP_LOCATION,
  STEP_PAYMENT,
  STEP_CONFIRM,
  A_DOMICILIO,
  PAYMENT_TYPE,
} from "../../utils/constants";
import {
  Confirm,
  Location,
  Payment,
  Resume,
} from "../../components/Checkout/Steps";
import LocationContext from "../../context/location/LocationContext";
import PaymentContext from "../../context/payment/PaymentContext";
import { validateCreditCardNumber } from "../../utils/validateCreditCardNumber";

import "./checkout.styles.css";

const items = [
  {
    label: "Resumen",
    command: (event) => {},
  },
  {
    label: "Ubicación",
    command: (event) => {},
  },
  {
    label: "Pago",
    command: (event) => {},
  },
  {
    label: "Confirmación",
    command: (event) => {},
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, totalAmount } = useContext(CartContext);
  const { locations, deliveryInstructions, deliveryType } =
    useContext(LocationContext);
  const { paymentInformation } = useContext(PaymentContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardInfo = paymentInformation.card;

  const isDisabled = () => {
    if (activeIndex === STEP_LOCATION) {
      return (
        (!locations?.length || !deliveryInstructions) &&
        deliveryType === A_DOMICILIO
      );
    }
    if (activeIndex === STEP_PAYMENT) {
      if (paymentInformation.typePayment === PAYMENT_TYPE[0]) {
        const isComplete =
          cardInfo.ownerNameCard !== "" &&
          cardInfo.type !== "" &&
          validateCreditCardNumber(cardInfo.number) &&
          cardInfo.expireDate !== "" &&
          cardInfo.securedCode !== null;
        return !isComplete;
      } else if (
        paymentInformation.typePayment === PAYMENT_TYPE[1] &&
        !paymentInformation.cash.isExact
      )
        return (
          !paymentInformation.cash.value ||
          paymentInformation.cash.value < totalAmount
        );
    }
    return false;
  };

  const onClick = () => {
    if (activeIndex < 4) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const cancelOrder = () => {
    navigate("/");
    clearCart();
  };

  useEffect(() => {
    if (!cartItems.length) {
      navigate("/");
    }
  }, [cartItems.length, navigate]);

  return (
    <div className="cart__container">
      <div className="steps__container">
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={!locations?.length || !deliveryInstructions}
          className="step__item"
        />
      </div>
      {activeIndex === STEP_RESUMEN && <Resume />}
      {activeIndex === STEP_LOCATION && <Location />}
      {activeIndex === STEP_PAYMENT && <Payment />}
      {activeIndex === STEP_CONFIRM && <Confirm />}

      <div className="buttons-resume__container">
        <Button
          className="p-button-danger mr-4"
          label="Cancelar pedido"
          onClick={cancelOrder}
        />
        {activeIndex < STEP_CONFIRM && (
          <Button
            iconPos="right"
            icon="pi pi-arrow-right"
            label="Siguiente"
            onClick={onClick}
            disabled={isDisabled()}
          />
        )}
        {activeIndex === STEP_CONFIRM && (
          <Button
            iconPos="right"
            className="p-button-success"
            label="Confirmar pedido"
            onClick={() => console.log("Confirmar pedido")}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;

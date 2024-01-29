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
import {
  showLogoByTypeCreditCard,
  validateCreditCardNumber,
} from "../../utils/validateCreditCardNumber";

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
  const { cartItems, clearCart, totalAmount, currentStep, setCurrentStep } =
    useContext(CartContext);
  const { locations, deliveryInstructions, deliveryType } =
    useContext(LocationContext);
  const { paymentInformation } = useContext(PaymentContext);
  const cardInfo = paymentInformation.card;

  const cvvDigits = showLogoByTypeCreditCard(
    paymentInformation.card.number
  ).cvvDigits;

  const checkCVV = () => {
    return (
      paymentInformation.card.securedCode &&
      cvvDigits === paymentInformation.card.securedCode.toString().length
    );
  };

  const isDisabled = () => {
    if (currentStep === STEP_LOCATION) {
      return (
        (!locations?.length || !deliveryInstructions) &&
        deliveryType === A_DOMICILIO
      );
    }
    if (currentStep === STEP_PAYMENT) {
      if (paymentInformation.typePayment === PAYMENT_TYPE[0]) {
        const isComplete =
          cardInfo.ownerNameCard !== "" &&
          cardInfo.type !== "" &&
          validateCreditCardNumber(cardInfo.number) &&
          cardInfo.expireDate !== "" &&
          checkCVV();
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
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const cancelOrder = () => {
    navigate("/");
    clearCart();
  };

  console.log("test");

  useEffect(() => {
    if (!cartItems.length) {
      navigate("/");
      clearCart();
    }
  }, [cartItems.length, clearCart, navigate]);

  return (
    <div className="cart__container">
      <div className="steps__container">
        <Steps
          model={items}
          activeIndex={currentStep}
          onSelect={(e) => setCurrentStep(e.index)}
          readOnly={!locations?.length || !deliveryInstructions}
          className="step__item"
        />
      </div>
      {currentStep === STEP_RESUMEN && <Resume />}
      {currentStep === STEP_LOCATION && <Location />}
      {currentStep === STEP_PAYMENT && <Payment />}
      {currentStep === STEP_CONFIRM && <Confirm />}

      <div className="buttons-resume__container">
        <Button
          className="p-button-danger mr-4"
          label="Cancelar pedido"
          onClick={cancelOrder}
        />
        {currentStep < STEP_CONFIRM && (
          <Button
            iconPos="right"
            icon="pi pi-arrow-right"
            label="Siguiente"
            onClick={onClick}
            disabled={isDisabled()}
          />
        )}
        {currentStep === STEP_CONFIRM && (
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

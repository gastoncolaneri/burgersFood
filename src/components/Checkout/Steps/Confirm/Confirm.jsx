import React, { useContext } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import Card from "../../../Cart/CardResume/CardResume.component";
import CartContext from "../../../../context/cart/CartContext";
import PaymentContext from "../../../../context/payment/PaymentContext";
import { PAYMENT_TYPE } from "../../../../utils/constants";
import { showLogoByTypeCreditCard } from "../../../../utils/validateCreditCardNumber";
import { getLastFourDigits } from "../../../../utils/getLastFourDigits";

function Confirm() {
  const { cartItems, totalAmount, setCurrentStep } = useContext(CartContext);
  const { paymentInformation } = useContext(PaymentContext);
  const deliveryFee = 2.39;
  const servicesFee = 1.02;
  const totalAmountWithFees = Number.parseFloat(
    totalAmount + deliveryFee + servicesFee
  ).toFixed(2);
  const logo = showLogoByTypeCreditCard(paymentInformation.card.number).logo;

  return (
    <div className="card">
      <Fieldset legend="Resumen" toggleable className="mb-4">
        <div className="w-full flex flex justify-content-end align-items-center">
          <Button
            label="Editar pedido"
            icon="pi pi-pencil"
            iconPos="right"
            className="p-button-text"
            onClick={() => setCurrentStep(0)}
          />
        </div>
        {cartItems?.map((item) => (
          <Card data={item} key={item?.id} hasChangeQuantity={false} />
        ))}
        <div className="flex align-items-start justify-content-end flex-column">
          <div className="subtotal__text mb-3 mt-3">
            Subtotal: €{totalAmount}
          </div>
          <div className="subtotal__text mb-3">
            Costo de envío: €{deliveryFee}
          </div>
          <div className="subtotal__text mb-3">
            Costo de servicios: €{servicesFee}
          </div>
          <div className="total__text">Total: €{totalAmountWithFees}</div>
        </div>
      </Fieldset>
      <Fieldset
        legend="Ubicación"
        toggleable
        collapsed
        className="mb-4"
      ></Fieldset>
      <Fieldset legend="Pago" toggleable collapsed>
        <Button className="w-full p-button-text">
          <div className="flex justify-content-space-between align-items-center w-full">
            {paymentInformation.typePayment === PAYMENT_TYPE[0] ? (
              <div className="w-full flex justify-content-start align-items-center">
                <div className="type-card mr-3">
                  <img
                    src={logo}
                    className="flex align-items-center justify-content-center"
                    alt="typeCreditCard"
                  />
                </div>
                {`${paymentInformation.card.type} ${getLastFourDigits(
                  paymentInformation.card.number
                )}`}
              </div>
            ) : (
              <div className="w-full flex justify-content-start align-items-center">
                Efectivo
              </div>
            )}
            <Button
              icon="pi pi-angle-right"
              iconPos="right"
              className="p-button-text flex justify-content-center align-items-end"
            />
          </div>
        </Button>
      </Fieldset>
    </div>
  );
}

export default Confirm;

import React, { useContext } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import Card from "../../../Cart/CardResume/CardResume.component";
import CartContext from "../../../../context/cart/CartContext";
import PaymentContext from "../../../../context/payment/PaymentContext";
import { A_DOMICILIO, PAYMENT_TYPE } from "../../../../utils/constants";
import { showLogoByTypeCreditCard } from "../../../../utils/validateCreditCardNumber";
import { getLastFourDigits } from "../../../../utils/getLastFourDigits";
import LocationContext from "../../../../context/location/LocationContext";
import Location from "../Location/Location.component";
import { typeDelivery } from "../../../../data/data";

function Confirm() {
  const { cartItems, totalAmount, setCurrentStep } = useContext(CartContext);
  const { paymentInformation } = useContext(PaymentContext);
  const { deliveryType } = useContext(LocationContext);
  const deliveryFee = 2.39;
  const servicesFee = 1.02;
  const totalAmountWithFees = Number.parseFloat(
    totalAmount + deliveryFee + servicesFee
  ).toFixed(2);
  const logo = showLogoByTypeCreditCard(paymentInformation.card.number).logo;

  const typeLocationContent = () => {
    const content = () => (
      <div className="flex align-items-center">
        <img
          alt="logo"
          src={
            deliveryType === A_DOMICILIO
              ? typeDelivery.delivery
              : typeDelivery.pickUp
          }
          width="32"
          style={{
            filter:
              "invert(100%) sepia(35%) saturate(0%) hue-rotate(17deg) brightness(101%) contrast(100%)",
          }}
        />
        <div className="ml-2">
          {deliveryType === A_DOMICILIO
            ? "Entrega a domicilio"
            : "Retiro en sucursal"}
        </div>
      </div>
    );

    return (
      <Message
        content={content}
        className="border-primary"
        style={{
          border: "solid #93c5fdad",
          borderWidth: "0px 0px 0px 6px",
          color: "#fff",
          backgroundColor: "#0b213f",
        }}
      />
    );
  };

  return (
    <div className="card mb-5">
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
        <div className="flex align-items-end justify-content-end flex-column p-2">
          <div className="subtotal__text mb-3 mt-3">
            Subtotal: €{totalAmount}
          </div>
          <div className="subtotal__text mb-3">
            Costo de envío: €{deliveryFee}
          </div>
          <div className="subtotal__text mb-3">
            Costo de servicios: €{servicesFee}
          </div>
          <div className="font-bold text-lg">Total: €{totalAmountWithFees}</div>
        </div>
      </Fieldset>
      <Fieldset legend="Entrega" toggleable collapsed className="mb-4 ">
        <div className="mb-4 align-items-center justify-content-between flex">
          {typeLocationContent()}
          <Button
            label="Editar entrega"
            icon="pi pi-pencil"
            iconPos="right"
            className="p-button-text"
            onClick={() => setCurrentStep(1)}
          />
        </div>
        {Location(false)}
      </Fieldset>
      <Fieldset legend="Pago" toggleable collapsed>
        <Button
          className="w-full p-button-text flex flex-1"
          onClick={() => setCurrentStep(2)}
        >
          <div className="flex align-items-center w-full justify-content-between">
            {paymentInformation.typePayment === PAYMENT_TYPE[0] ? (
              <div className="flex align-items-center">
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
              <div className="flex align-items-center">Efectivo</div>
            )}
            <div>
              <span className="mr-1 font-bold">Editar medio de pago </span>
              <i className="pi pi-pencil" />
            </div>
          </div>
        </Button>
      </Fieldset>
    </div>
  );
}

export default Confirm;

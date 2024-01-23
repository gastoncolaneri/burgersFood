import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import {
  showLogoByTypeCreditCard,
  validateCreditCardNumber,
} from "../../../../utils/validateCreditCardNumber";

import "./payment.styles.css";

const Payment = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    ownerNameCard: "",
    card: { type: "", number: "", expireDate: "", securedCode: "" },
    cash: { value: 0, exchange: 0 },
  });

  const [togglePayment, setTogglePayment] = useState(true);
  const [typeCreditCard, setTypeCreditCard] = useState("");

  const cvvDigits = showLogoByTypeCreditCard(paymentInfo.card.number).cvvDigits;

  useEffect(() => {
    const logo = showLogoByTypeCreditCard(paymentInfo.card.number).logo;
    setTypeCreditCard(logo);
  }, [paymentInfo.card.number]);

  const checkValidCCNumber = () => {
    return (
      paymentInfo.card.number &&
      !validateCreditCardNumber(paymentInfo.card.number)
    );
  };

  const cvvInvalidText = () => {
    return `El CVV debe contener ${cvvDigits} digitos`;
  };

  const checkCVV = () => {
    return (
      cvvDigits !== paymentInfo.card.securedCode.length &&
      !!paymentInfo.card.securedCode &&
      checkValidCCNumber()
    );
  };

  return (
    <div className="payment__container">
      <h3 className="text-center"> Pagar con</h3>
      <div className="payment-toggle_container">
        <div
          className={`${
            togglePayment && "selected__toggle"
          } payment-toggle__button`}
          role="button"
          onClick={() => setTogglePayment(true)}
        >
          <i className="pi pi-credit-card" style={{ fontSize: "2rem" }}></i>
          Tarjeta
        </div>
        <div
          className={`${
            !togglePayment && "selected__toggle"
          } payment-toggle__button`}
          role="button"
          onClick={() => setTogglePayment(false)}
        >
          <i className="pi pi-money-bill" style={{ fontSize: "2rem" }}></i>
          Efectivo
        </div>
      </div>
      {togglePayment ? (
        <div className="card-payment__container">
          <span className="p-float-label mb-2">
            <InputText
              id="ownerNameCard"
              aria-describedby="ownerNameCard"
              className="owner-name__input"
              value={paymentInfo.ownerNameCard}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  ownerNameCard: e.target.value,
                })
              }
            />
            <label htmlFor="ownerNameCard">Titular</label>
          </span>
          <div className="card-payment__row mb-2">
            <div className="number-card__input align-items-start">
              <span className="p-float-label w-full mr-3 flex flex-column">
                <InputText
                  id="numberCard"
                  aria-describedby="numberCard"
                  className={`${checkValidCCNumber() && "p-invalid"} w-full"`}
                  keyfilter="int"
                  value={paymentInfo.card.number}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      card: { ...paymentInfo.card, number: e.target.value },
                    })
                  }
                />
                <label htmlFor="numberCard">Número</label>
                {checkValidCCNumber() && (
                  <small id="numberCard-help" className="mt-1">
                    El número de tarjeta no es válido
                  </small>
                )}
              </span>
              <div className="type-card">
                <img
                  src={typeCreditCard}
                  className="flex align-items-center justify-content-center"
                  alt="typeCreditCard"
                />
              </div>
            </div>
          </div>
          <div className="card-payment__row align-items-start">
            <span className="p-float-label flex flex-column">
              <Calendar
                id="expirationDate"
                aria-describedby="expirationDate"
                className={"expiration-date__input"}
                value={paymentInfo.card.expireDate}
                onChange={(e) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    card: { ...paymentInfo.card, expireDate: e.target.value },
                  })
                }
                minDate={new Date()}
                dateFormat="mm/yy"
                view="month"
                readOnlyInput
              />

              <label htmlFor="expiration-date">Fecha de vencimiento</label>
            </span>
            <span className="p-float-label flex flex-column">
              <InputText
                id="securedCode"
                aria-describedby="securedCode"
                className="secured-code__input"
                keyfilter="int"
                value={paymentInfo.card.securedCode}
                onChange={(e) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    card: { ...paymentInfo.card, securedCode: e.target.value },
                  })
                }
              />
              <label htmlFor="securedCode">CVV</label>
              {checkCVV() && (
                <small id="securedCode-help" className="mt-1">
                  {cvvInvalidText()}
                </small>
              )}
            </span>
          </div>
        </div>
      ) : (
        <div className="card-payment__row align-items-start">
          <span className="p-float-label flex flex-column">
            <InputText
              id="securedCode"
              aria-describedby="securedCode"
              className="secured-code__input"
              keyfilter="int"
              value={paymentInfo.card.securedCode}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  card: { ...paymentInfo.card, securedCode: e.target.value },
                })
              }
            />
            <label htmlFor="securedCode">Importe</label>
          </span>
          <span className="p-float-label flex flex-column">
            <InputText
              id="securedCode"
              aria-describedby="securedCode"
              className="secured-code__input"
              keyfilter="int"
              value={paymentInfo.card.securedCode}
              onChange={(e) =>
                setPaymentInfo({
                  ...paymentInfo,
                  card: { ...paymentInfo.card, securedCode: e.target.value },
                })
              }
            />
            <label htmlFor="securedCode">Cambio</label>
          </span>
        </div>
      )}
    </div>
  );
};

export default Payment;

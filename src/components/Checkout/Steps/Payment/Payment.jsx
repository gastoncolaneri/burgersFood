import React, { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import {
  showLogoByTypeCreditCard,
  validateCreditCardNumber,
} from "../../../../utils/validateCreditCardNumber";
import PaymentContext from "../../../../context/payment/PaymentContext";
import {
  PAYMENT_TYPE,
  amountRegex,
  isExactOptions,
  ownerCardRegex,
} from "../../../../utils/constants";

import "./payment.styles.css";

const Payment = () => {
  const { paymentInformation, setPaymentInformation } =
    useContext(PaymentContext);
  const [typeCreditCard, setTypeCreditCard] = useState("");
  const [isExactAmount, setTIsExactAmount] = useState(isExactOptions[0]);

  const cvvDigits = showLogoByTypeCreditCard(
    paymentInformation.card.number
  ).cvvDigits;

  useEffect(() => {
    const logo = showLogoByTypeCreditCard(paymentInformation.card.number).logo;
    setTypeCreditCard(logo);
  }, [paymentInformation.card.number]);

  const checkValidCCNumber = () => {
    return (
      paymentInformation.card.number &&
      !validateCreditCardNumber(paymentInformation.card.number)
    );
  };

  const cvvInvalidText = () => {
    return `El CVV debe contener ${cvvDigits} digitos`;
  };

  const checkCVV = () => {
    return (
      paymentInformation.card.securedCode &&
      cvvDigits !== paymentInformation.card.securedCode.toString().length
    );
  };

  return (
    <div className="payment__container">
      <h3 className="text-center"> Pagar con</h3>
      <div className="payment-toggle_container">
        <div
          className={`${
            paymentInformation.typePayment === PAYMENT_TYPE[0] &&
            "selected__toggle"
          } payment-toggle__button`}
          role="button"
          onClick={() =>
            setPaymentInformation({
              ...paymentInformation,
              typePayment: PAYMENT_TYPE[0],
            })
          }
        >
          <i className="pi pi-credit-card" style={{ fontSize: "2rem" }}></i>
          Tarjeta
        </div>
        <div
          className={`${
            paymentInformation.typePayment === PAYMENT_TYPE[1] &&
            "selected__toggle"
          } payment-toggle__button`}
          role="button"
          onClick={() =>
            setPaymentInformation({
              ...paymentInformation,
              typePayment: PAYMENT_TYPE[1],
            })
          }
        >
          <i className="pi pi-money-bill" style={{ fontSize: "2rem" }}></i>
          Efectivo
        </div>
      </div>
      {paymentInformation.typePayment === PAYMENT_TYPE[0] ? (
        <div className="card-payment__container">
          <span className="p-float-label mb-2">
            <InputText
              id="ownerNameCard"
              aria-describedby="ownerNameCard"
              className="owner-name__input"
              keyfilter={ownerCardRegex}
              value={paymentInformation.card.ownerNameCard}
              onChange={(e) =>
                setPaymentInformation({
                  ...paymentInformation,
                  card: {
                    ...paymentInformation.card,
                    ownerNameCard: e.target.value,
                  },
                })
              }
            />
            <label htmlFor="ownerNameCard">Titular</label>
          </span>
          <div className="card-payment__row mb-2">
            <div className="number-card__input align-items-start">
              <span className="p-float-label w-full mr-3 flex flex-column">
                <InputNumber
                  id="numberCard"
                  useGrouping={false}
                  aria-describedby="numberCard"
                  className={`${checkValidCCNumber() && "p-invalid"} w-full"`}
                  value={paymentInformation.card.number}
                  keyfilter="pint"
                  onChange={(e) => {
                    setPaymentInformation({
                      ...paymentInformation,
                      card: {
                        ...paymentInformation.card,
                        number: e.value,
                        type: showLogoByTypeCreditCard(e.value).name,
                      },
                    });
                  }}
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
                value={paymentInformation.card.expireDate}
                onChange={(e) =>
                  setPaymentInformation({
                    ...paymentInformation,
                    card: {
                      ...paymentInformation.card,
                      expireDate: e.target.value,
                    },
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
              <InputNumber
                id="securedCode"
                aria-describedby="securedCode"
                className="secured-code__input"
                keyfilter="pint"
                useGrouping={false}
                value={paymentInformation.card.securedCode}
                onChange={(e) =>
                  setPaymentInformation({
                    ...paymentInformation,
                    card: {
                      ...paymentInformation.card,
                      securedCode: e.value,
                    },
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
        <>
          <div className="card-payment__row align-items-center justify-content-center mb-4">
            <span className="flex flex-column align-items-center justify-content-center">
              <label htmlFor="exactAmount" className="mb-2">
                ¿Abona con el importe exacto?
              </label>
              <SelectButton
                value={isExactAmount}
                allowEmpty={false}
                onChange={(e) => {
                  e.target.value && setTIsExactAmount(e.target.value);
                  setPaymentInformation({
                    ...paymentInformation,
                    cash: {
                      ...paymentInformation.cash,
                      isExact: e.target.value === isExactOptions[0],
                    },
                  });
                }}
                options={isExactOptions}
                id="exactAmount"
              />
            </span>
          </div>
          {isExactAmount === isExactOptions[1] && (
            <span className="p-float-label flex flex-column">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-money-bill"></i>
                </span>
                <InputNumber
                  placeholder="Importe"
                  id="amountAvailable"
                  mode="currency"
                  currency="EUR"
                  keyfilter={amountRegex}
                  aria-describedby="amountAvailable"
                  // className="secured-code__input"
                  value={paymentInformation.cash.value}
                  onChange={(e) =>
                    setPaymentInformation({
                      ...paymentInformation,
                      cash: {
                        ...paymentInformation.cash,
                        value: e.value,
                      },
                    })
                  }
                />
              </div>
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Payment;

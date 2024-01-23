import { typeCreditCard } from "../data/data";

export const validateCreditCardNumber = (creditCardNumber) => {
  let visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  let mastercardPattern = /^(?:5[1-5][0-9]{14})$/;
  let amexPattern = /^(?:3[47][0-9]{13})$/;

  let isVisa = visaPattern.test(creditCardNumber) === true;
  let isMastercard = mastercardPattern.test(creditCardNumber) === true;
  let isAmex = amexPattern.test(creditCardNumber) === true;

  return isVisa || isMastercard || isAmex;
};

export const showLogoByTypeCreditCard = (creditCardNumber) => {
  let visaPattern = /^4/;
  let mastercardPattern = /^5[1-5]/;
  let amexPattern = /^3[47]/;

  let isVisa = visaPattern.test(creditCardNumber);
  let isMastercard = mastercardPattern.test(creditCardNumber);
  let isAmex = amexPattern.test(creditCardNumber);

  switch (true) {
    case isVisa:
      return { logo: typeCreditCard.visa, cvvDigits: 4 };
    case isMastercard:
      return { logo: typeCreditCard.mastercard, cvvDigits: 4 };
    case isAmex:
      return { logo: typeCreditCard.amex, cvvDigits: 3 };
    default:
      return { logo: typeCreditCard.invalidCard, cvvDigits: null };
  }
};

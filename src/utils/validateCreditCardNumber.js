import {
  amexPatternFirstDigits,
  amexPatternFullNumber,
  creditCardTypes,
  mastercardPatternFirstDigits,
  mastercardPatternFullNumber,
  visaPatternFirstDigits,
  visaPatternFullNumber,
} from "./constants";

export const validateCreditCardNumber = (creditCardNumber) => {
  let isVisa = visaPatternFullNumber.test(creditCardNumber) === true;
  let isMastercard =
    mastercardPatternFullNumber.test(creditCardNumber) === true;
  let isAmex = amexPatternFullNumber.test(creditCardNumber) === true;

  return isVisa || isMastercard || isAmex;
};

export const showLogoByTypeCreditCard = (creditCardNumber) => {
  let isVisa = visaPatternFirstDigits.test(creditCardNumber);
  let isMastercard = mastercardPatternFirstDigits.test(creditCardNumber);
  let isAmex = amexPatternFirstDigits.test(creditCardNumber);

  switch (true) {
    case isVisa:
      return creditCardTypes.visa;
    case isMastercard:
      return creditCardTypes.masterCard;
    case isAmex:
      return creditCardTypes.amex;
    default:
      return creditCardTypes.invalid;
  }
};

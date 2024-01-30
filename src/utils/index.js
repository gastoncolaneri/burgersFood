export const amountToPay = (items) => {
  const partialAmount = items.map((item) => {
    return item?.price * item?.quantity;
  });

  const amount = partialAmount.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return amount;
};

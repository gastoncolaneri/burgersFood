export const getLastFourDigits = (number) => {
  // Convert the number to a string
  const numberString = Math.abs(number).toString();

  // Use slice to get the last four characters
  const lastFourDigits = numberString.slice(-4);

  return lastFourDigits;
};

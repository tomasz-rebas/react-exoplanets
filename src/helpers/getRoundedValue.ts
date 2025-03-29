// Rounding to the hundredths place and removing trailing zeros
export const getRoundedValue = (value: number): number =>
  Number.isInteger(value) ? value : parseFloat(value.toFixed(2));

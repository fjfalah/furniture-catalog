export const toIndonesianCurrency = (number: string | number): string => {
  const format = parseFloat(number.toString());
  const transformNumber = new Intl.NumberFormat(['ban', 'id']).format(format);
  return `Rp ${transformNumber},00`;
};

export const textWithMaxLength = (
  value: string,
  maxLength?: number
): string => {
  const format = `${value.substring(0, maxLength - 3)}...`;

  return format;
};

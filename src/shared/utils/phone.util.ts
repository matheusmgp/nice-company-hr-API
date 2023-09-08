export const formatPhoneOnlyNumber = phone => {
  let numeros = phone
    .toString()
    .replace('-', '')
    .replace('(', '')
    .replace(')', '')
    .replace(' ', '');

  if (!Number.isNaN(Number(numeros))) return numeros;

  return null;
};

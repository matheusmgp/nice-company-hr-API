export const formatPhoneOnlyNumber = phone => {
  let numeros = phone
    .toString()
    .replace('-', '')
    .replace('(', '')
    .replace(')', '')
    .replace(' ', '');
  return numeros;
};

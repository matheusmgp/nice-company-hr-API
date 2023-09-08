export const formatCpfOnlyNumber = cpf => {
  let numeros = cpf.toString().replace(/\.|-/gm, '');
  if (numeros.length === 11) return numeros;

  return null;
};

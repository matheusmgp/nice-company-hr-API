import { formatCpfOnlyNumber } from '../cpf.util';

describe('CpfFormatter unit tests', () => {
  it('should replace all symbols', () => {
    const cpf = '604.258.369-99';
    const formattedCpf = formatCpfOnlyNumber(cpf);
    expect(formattedCpf).toStrictEqual('60425836999');
  });
  it('should return null when passing an invalid CPF without number', () => {
    const cpf = 'INVALID';
    const formattedCpf = formatCpfOnlyNumber(cpf);
    expect(formattedCpf).toBeNull();
  });
  it('should return null when passing an invalid CPF with less than 14 characters', () => {
    const cpf = '1234567894785';
    const formattedCpf = formatCpfOnlyNumber(cpf);
    expect(formattedCpf).toBeNull();
  });
  it('should return null when passing an invalid CPF with more than 14 characters', () => {
    const cpf = '123456734324234324324894785';
    const formattedCpf = formatCpfOnlyNumber(cpf);
    expect(formattedCpf).toBeNull();
  });
});

import { formatPhoneOnlyNumber } from '../../phone.util';

describe('PhoneFomatter unit tests', () => {
  it('should replace all symbols', () => {
    const phone = '(85) 99803-3564';
    const formattedPhone = formatPhoneOnlyNumber(phone);
    expect(formattedPhone).toStrictEqual('85998033564');
  });
  it('should replace all symbols', () => {
    const phone = '85998033564';
    const formattedPhone = formatPhoneOnlyNumber(phone);
    expect(formattedPhone).toStrictEqual('85998033564');
  });
  it('should return null if phone is invalid', () => {
    const phone = 'invalid';
    const formattedPhone = formatPhoneOnlyNumber(phone);
    expect(formattedPhone).toBeNull();
  });
});

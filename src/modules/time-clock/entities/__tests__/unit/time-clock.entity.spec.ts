import { TimeClock, TimeClockProps } from '../../time-clock.entity';

describe('TimeClockEntity unit tests', () => {
  let props: TimeClockProps = {
    name: 'mocked name',
    email: 'mock@mock.com',
    phone: '(85) 99803-3564',
    cpf: '604.147.258-99',
    knowledges: 'PHP,JAVASCRIPT,CSS',
    status: 'PENDENTE',
  };
  let sut: TimeClock;
  beforeEach(() => {
    sut = new TimeClock(props);
  });
  it('Constructor method', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.phone).toEqual(props.phone);
    expect(sut.props.cpf).toEqual(props.cpf);
    expect(sut.props.phone).toEqual(props.phone);
  });
});

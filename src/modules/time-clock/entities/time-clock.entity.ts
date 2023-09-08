export type TimeClockProps = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: string;
  knowledges: string;
};
export class TimeClock {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: string;
  knowledges: string;

  constructor(public readonly props: TimeClockProps) {
    const { name, email, cpf, phone, status, knowledges } = props;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.phone = phone;
    this.status = status;
    this.knowledges = knowledges;
  }
}

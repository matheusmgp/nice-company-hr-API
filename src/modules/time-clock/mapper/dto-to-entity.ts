import { CreateTimeClockDto } from '../dto/create-time-clock.dto';
import { TimeClock } from '../entities/time-clock.entity';

export const mapperCreate = (dto: CreateTimeClockDto): TimeClock => {
  const { name, email, cpf, phone, knowledges } = dto;
  const timeCLock = new TimeClock();
  timeCLock.name = name;
  timeCLock.email = email;
  timeCLock.cpf = cpf;
  timeCLock.phone = phone;
  timeCLock.knowledges = knowledges.join();
  timeCLock.status = false;
  return timeCLock;
};

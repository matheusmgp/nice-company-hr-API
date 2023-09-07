import { TimeClockStatusEnum } from '@/shared/enums/time-clock-status.enum';
import { CreateTimeClockDto } from '../dto/create-time-clock.dto';
import { TimeClock } from '../entities/time-clock.entity';
import { formatCpfOnlyNumber } from '@/shared/utils/cpf.util';
import { formatPhoneOnlyNumber } from '@/shared/utils/phone.util';

export const mapperCreate = (dto: CreateTimeClockDto): TimeClock => {
  const { name, email, cpf, phone, knowledges } = dto;
  const timeCLock = new TimeClock();
  timeCLock.name = name;
  timeCLock.email = email;
  timeCLock.cpf = formatCpfOnlyNumber(cpf);
  timeCLock.phone = formatPhoneOnlyNumber(phone);
  timeCLock.knowledges = knowledges.join();
  timeCLock.status = TimeClockStatusEnum.PENDENTE;
  return timeCLock;
};

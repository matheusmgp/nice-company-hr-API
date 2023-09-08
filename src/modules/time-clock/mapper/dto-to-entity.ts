import { TimeClockStatusEnum } from '@/shared/enums/time-clock-status.enum';
import { CreateTimeClockDto } from '../dto/create-time-clock.dto';
import { TimeClock } from '../entities/time-clock.entity';
import { formatCpfOnlyNumber } from '@/shared/utils/cpf.util';
import { formatPhoneOnlyNumber } from '@/shared/utils/phone.util';

export const mapperCreate = (dto: CreateTimeClockDto): TimeClock => {
  const { name, email, cpf, phone, knowledges } = dto;
  const timeCLock = new TimeClock({
    name,
    email,
    cpf: formatCpfOnlyNumber(cpf),
    phone: phone ? formatPhoneOnlyNumber(phone) : '',
    knowledges: knowledges.join(),
    status: TimeClockStatusEnum.PENDENTE,
  });

  return timeCLock;
};

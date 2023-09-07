import { IBaseService } from '@/shared/interfaces/base-service.interface';
import { TimeClock } from '../entities/time-clock.entity';

export interface ITimeClockService extends IBaseService<TimeClock> {
  getByCpf(cpf: string): Promise<any>;
}
export const ITimeClockService = Symbol('ITimeClockService');

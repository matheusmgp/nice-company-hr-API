import { IBaseRepository } from '@/shared/interfaces/base-repository.interface';
import { TimeClock } from '../entities/time-clock.entity';

export interface ITimeClockRepository extends IBaseRepository<TimeClock> {
  getByCpf(cpf: string): Promise<any>;
}
export const ITimeClockRepository = Symbol('ITimeClockRepository');

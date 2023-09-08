import { IBaseRepository } from '@/shared/interfaces/base-repository.interface';
import { TimeClock } from '../entities/time-clock.entity';

export interface ITimeClockRepository extends IBaseRepository<TimeClock> {}

export const ITimeClockRepository = Symbol('ITimeClockRepository');

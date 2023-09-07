import { Injectable, Inject } from '@nestjs/common';
import { ITimeClockService } from './interfaces/timeclock.service.interface';
import { ITimeClockRepository } from './interfaces/timeclock.repository.interface';
import { TimeClock } from './entities/time-clock.entity';

@Injectable()
export class TimeClockService implements ITimeClockService {
  constructor(
    @Inject(ITimeClockRepository)
    private readonly timeClockRepository: ITimeClockRepository,
  ) {}
  async getByCpf(cpf: string): Promise<any> {
    return await this.timeClockRepository.getByCpf(cpf);
  }
  async create(payload: TimeClock): Promise<any> {
    return await this.timeClockRepository.create(payload);
  }

  async getAll(): Promise<any[]> {
    return await this.timeClockRepository.getAll();
  }

  async getById(id: number): Promise<any> {
    return await this.timeClockRepository.getById(id);
  }

  async update(id: number, payload: TimeClock): Promise<any> {
    return await this.timeClockRepository.update(id, payload);
  }
}

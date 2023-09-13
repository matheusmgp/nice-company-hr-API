import { Injectable, Inject } from '@nestjs/common';
import { ITimeClockService } from './interfaces/timeclock.service.interface';
import { ITimeClockRepository } from './interfaces/timeclock.repository.interface';
import { TimeClock } from './entities/time-clock.entity';
import { DatabaseError } from '@/shared/errors/database-error';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimeClockService implements ITimeClockService {
  constructor(
    @Inject(ITimeClockRepository)
    private readonly timeClockRepository: ITimeClockRepository,
  ) {}
  async getByCpf(cpf: string): Promise<any> {
    try {
      return await this.timeClockRepository.getByCpf(cpf);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError('Server has closed the connection.');
      }
      throw new Error(err);
    }
  }
  async create(payload: TimeClock): Promise<any> {
    try {
      return await this.timeClockRepository.create(payload);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError('Server has closed the connection.');
      }
      throw new Error(err);
    }
  }

  async getAll(): Promise<any[]> {
    try {
      return await this.timeClockRepository.getAll();
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError('Server has closed the connection.');
      }
      throw new Error(err);
    }
  }

  async getById(id: number): Promise<any> {
    return await this.timeClockRepository.getById(id);
  }

  async update(id: number, payload: TimeClock): Promise<any> {
    return await this.timeClockRepository.update(id, payload);
  }
}

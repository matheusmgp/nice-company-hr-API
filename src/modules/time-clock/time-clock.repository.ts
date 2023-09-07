import { Injectable } from '@nestjs/common';
import { ITimeClockRepository } from './interfaces/timeclock.repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { TimeClock } from './entities/time-clock.entity';

@Injectable()
export class TimeClockRepository implements ITimeClockRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll(): Promise<any[]> {
    return await this.prismaService.register.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
  async getById(id: number): Promise<any> {
    return await this.prismaService.register.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async create(payload: TimeClock): Promise<any> {
    const created = await this.prismaService.register.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        cpf: payload.cpf,
        status: payload.status,
        knowledges: payload.knowledges,
      },
    });

    return created;
  }
  async update(id: number, payload: TimeClock): Promise<any> {
    return await this.prismaService.register.update({
      where: {
        id,
      },
      data: {
        status: payload.status,
      },
    });
  }
}

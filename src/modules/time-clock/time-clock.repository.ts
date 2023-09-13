import { Injectable } from '@nestjs/common';
import { ITimeClockRepository } from './interfaces/timeclock.repository.interface';
import { PrismaService } from '../prisma/prisma.service';
import { TimeClock } from './entities/time-clock.entity';
import { NotFoundError } from '@/shared/errors/not-found-error';
import { DatabaseError } from '@/shared/errors/database-error';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimeClockRepository implements ITimeClockRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getByCpf(cpf: string): Promise<any> {
    return await this.prismaService.register.findFirst({
      where: {
        cpf,
      },
    });
  }
  async getAll(): Promise<any[]> {
    return await this.prismaService.register.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
  async getById(id: number): Promise<any> {
    await this._get(id);
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
    await this._get(id);
    return await this.prismaService.register.update({
      where: {
        id,
      },
      data: {
        status: payload.status,
        updatedAt: new Date(),
      },
    });
  }
  protected async _get(id: number): Promise<any> {
    try {
      const user = await this.prismaService.register.findUnique({
        where: {
          id,
        },
      });

      if (user == null)
        throw new NotFoundError(`Register not found using ID ${id}`);
      return user;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new DatabaseError(
          `Server has closed the connection,Can't reach database server`,
        );
      }
      if (err instanceof NotFoundError) {
        throw new NotFoundError(err.message);
      }
    }
  }
}

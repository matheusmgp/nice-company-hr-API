import { Test, TestingModule } from '@nestjs/testing';
import { TimeClockService } from '../../time-clock.service';
import { ITimeClockService } from '../../interfaces/timeclock.service.interface';
import { TimeClockModule } from '../../time-clock.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TimeClock } from '../../entities/time-clock.entity';
import { formatCpfOnlyNumber } from '@/shared/utils/cpf.util';
import { formatPhoneOnlyNumber } from '@/shared/utils/phone.util';
import { TimeClockStatusEnum } from '@/shared/enums/time-clock-status.enum';

describe('TimeClockService unit test', () => {
  let sut: ITimeClockService;
  let entity: TimeClock;
  let prisma: PrismaService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeClockService, PrismaService],
      imports: [TimeClockModule, PrismaModule],
    }).compile();
    sut = module.get<TimeClockService>(TimeClockService);
    prisma = module.get<PrismaService>(PrismaService);
    entity = new TimeClock({
      name: 'mock name',
      email: 'mock@email.com',
      cpf: formatCpfOnlyNumber('604.123.903-88'),
      phone: formatPhoneOnlyNumber('(85) 99803-3564'),
      knowledges: 'GIT,javascript,Typescript',
      status: TimeClockStatusEnum.PENDENTE,
    });
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it(`should create a register`, async () => {
    const repoSpyOn = jest.spyOn(prisma.register, 'create').mockResolvedValue({
      id: 1,
      name: entity.name,
      email: entity.email,
      cpf: entity.cpf,
      phone: entity.phone,
      status: 'PENDENTE',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: expect.any(Date),
    });
    const response = await sut.create(entity);
    expect(response).toEqual({
      id: 1,
      name: entity.name,
      email: entity.email,
      cpf: entity.cpf,
      phone: entity.phone,
      status: 'PENDENTE',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: expect.any(Date),
    });
    expect(repoSpyOn).toHaveBeenCalledTimes(1);
    expect(repoSpyOn).toHaveBeenCalledWith({
      data: {
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        cpf: entity.cpf,
        status: entity.status,
        knowledges: entity.knowledges,
      },
    });
  });
  it(`should update a register status`, async () => {
    const sutSpyOn = jest.spyOn(prisma.register, 'update').mockResolvedValue({
      id: 1,
      name: entity.name,
      email: entity.email,
      cpf: entity.cpf,
      phone: entity.phone,
      status: 'VALIDADO',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: new Date(),
    });
    const response = await sut.update(1, { ...entity, status: 'VALIDADO' });
    expect(response).toEqual({
      id: 1,
      name: entity.name,
      email: entity.email,
      cpf: entity.cpf,
      phone: entity.phone,
      status: 'VALIDADO',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: expect.any(Date),
    });
    expect(sutSpyOn).toHaveBeenCalledTimes(1);
    expect(sutSpyOn).toHaveBeenCalledWith({
      data: { status: 'VALIDADO', updatedAt: expect.any(Date) },
      where: { id: 1 },
    });
  });
  it(`should return a single register`, async () => {
    const sutSpyOn = jest
      .spyOn(prisma.register, 'findUniqueOrThrow')
      .mockResolvedValue({
        id: 1,
        name: 'João da Silva',
        email: 'joao@gmail.com',
        cpf: '60478963255',
        phone: '85998033452',
        status: 'NAO VALIDADO',
        assignedAt: new Date(),
        knowledges: 'TypeScript,Banco de Dados,DevOps',
        updatedAt: new Date(),
      });
    const response = await sut.getById(1);
    expect(response).toEqual({
      id: 1,
      name: 'João da Silva',
      email: 'joao@gmail.com',
      cpf: '60478963255',
      phone: '85998033452',
      status: 'NAO VALIDADO',
      assignedAt: expect.any(Date),
      knowledges: 'TypeScript,Banco de Dados,DevOps',
      updatedAt: expect.any(Date),
    });
    expect(sutSpyOn).toHaveBeenCalledTimes(1);
    expect(sutSpyOn).toHaveBeenCalledWith({ where: { id: 1 } });
  });
  it(`should return a list of registers`, async () => {
    const sutSpyOn = jest.spyOn(prisma.register, 'findMany').mockResolvedValue([
      {
        id: 1,
        name: 'João da Silva',
        email: 'joao@gmail.com',
        cpf: '60478963255',
        phone: '85998033452',
        status: 'NAO VALIDADO',
        assignedAt: new Date(),
        knowledges: 'TypeScript,Banco de Dados,DevOps',
        updatedAt: new Date(),
      },
      {
        id: 1,
        name: 'João da Silva',
        email: 'joao@gmail.com',
        cpf: '60478963255',
        phone: '85998033452',
        status: 'NAO VALIDADO',
        assignedAt: new Date(),
        knowledges: 'TypeScript,Banco de Dados,DevOps',
        updatedAt: new Date(),
      },
    ]);
    const response = await sut.getAll();
    expect(response).toEqual([
      {
        id: 1,
        name: 'João da Silva',
        email: 'joao@gmail.com',
        cpf: '60478963255',
        phone: '85998033452',
        status: 'NAO VALIDADO',
        assignedAt: expect.any(Date),
        knowledges: 'TypeScript,Banco de Dados,DevOps',
        updatedAt: expect.any(Date),
      },
      {
        id: 1,
        name: 'João da Silva',
        email: 'joao@gmail.com',
        cpf: '60478963255',
        phone: '85998033452',
        status: 'NAO VALIDADO',
        assignedAt: expect.any(Date),
        knowledges: 'TypeScript,Banco de Dados,DevOps',
        updatedAt: expect.any(Date),
      },
    ]);
    expect(sutSpyOn).toHaveBeenCalledTimes(1);
    expect(sutSpyOn).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });
});

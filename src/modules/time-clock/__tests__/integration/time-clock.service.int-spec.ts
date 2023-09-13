import { Test, TestingModule } from '@nestjs/testing';
import { TimeClockService } from '../../time-clock.service';
import { ITimeClockService } from '../../interfaces/timeclock.service.interface';
import { TimeClockModule } from '../../time-clock.module';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TimeClock } from '../../entities/time-clock.entity';
import { formatCpfOnlyNumber } from '@/shared/utils/cpf.util';
import { formatPhoneOnlyNumber } from '@/shared/utils/phone.util';
import { TimeClockStatusEnum } from '@/shared/enums/time-clock-status.enum';
import { setupPrismaTests } from '../testing/setup-prisma-tests';
import { PrismaClient } from '@prisma/client';
import { TimeClockRepository } from '../../time-clock.repository';
import { ITimeClockRepository } from '../../interfaces/timeclock.repository.interface';
import { NotFoundError } from '@/shared/errors/not-found-error';

describe('TimeClockService integration test', () => {
  let sut: ITimeClockService;
  let repository: ITimeClockRepository;
  let entity: TimeClock;
  let module: TestingModule;
  const prismaService = new PrismaClient();
  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      providers: [TimeClockService],
      imports: [TimeClockModule, PrismaModule.forTest(prismaService)],
    }).compile();
    sut = module.get<TimeClockService>(TimeClockService);
    repository = module.get<TimeClockRepository>(TimeClockRepository);
    entity = new TimeClock({
      name: 'mock name',
      email: 'mock@email.com',
      cpf: formatCpfOnlyNumber('604.123.903-88'),
      phone: formatPhoneOnlyNumber('(85) 99803-3564'),
      knowledges: 'GIT,javascript,Typescript',
      status: TimeClockStatusEnum.PENDENTE,
    });
  });
  afterAll(async () => {
    await module.close();
  });
  beforeEach(async () => {
    sut = new TimeClockService(repository);
    await prismaService.register.deleteMany({});
  });
  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it(`should create a register`, async () => {
    const response = await sut.create(entity);
    expect(response).toStrictEqual({
      id: expect.any(Number),
      name: 'mock name',
      email: 'mock@email.com',
      cpf: '60412390388',
      phone: '85998033564',
      status: 'PENDENTE',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: null,
    });
  });
  it(`should create a register with empty phone field`, async () => {
    const response = await sut.create({ ...entity, phone: '' });
    expect(response).toStrictEqual({
      id: expect.any(Number),
      name: 'mock name',
      email: 'mock@email.com',
      cpf: '60412390388',
      phone: '',
      status: 'PENDENTE',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: null,
    });
  });
  it(`should update a register status`, async () => {
    const created = await prismaService.register.create({ data: entity.props });
    const response = await sut.update(created.id, {
      ...entity,
      status: 'VALIDADO',
    });

    expect(response).toStrictEqual({
      id: expect.any(Number),
      name: 'mock name',
      email: 'mock@email.com',
      cpf: '60412390388',
      phone: '85998033564',
      status: 'VALIDADO',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: expect.any(Date),
    });
  });
  it(`should return a single register byId`, async () => {
    const created = await prismaService.register.create({ data: entity.props });
    const response = await sut.getById(created.id);

    expect(response).toStrictEqual({
      id: expect.any(Number),
      name: 'mock name',
      email: 'mock@email.com',
      cpf: '60412390388',
      phone: '85998033564',
      status: 'PENDENTE',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: null,
    });
  });
  it(`should return a single register byCpf`, async () => {
    const created = await prismaService.register.create({ data: entity.props });
    const response = await sut.getByCpf(created.cpf);

    expect(response).toStrictEqual({
      id: expect.any(Number),
      name: 'mock name',
      email: 'mock@email.com',
      cpf: '60412390388',
      phone: '85998033564',
      status: 'PENDENTE',
      assignedAt: expect.any(Date),
      knowledges: 'GIT,javascript,Typescript',
      updatedAt: null,
    });
  });
  it(`should return a list of registers`, async () => {
    await prismaService.register.create({ data: entity.props });
    const response = await sut.getAll();
    expect(response).toStrictEqual([
      {
        id: expect.any(Number),
        name: 'mock name',
        email: 'mock@email.com',
        cpf: '60412390388',
        phone: '85998033564',
        status: 'PENDENTE',
        assignedAt: expect.any(Date),
        knowledges: 'GIT,javascript,Typescript',
        updatedAt: null,
      },
    ]);
  });

  it('should throws NotFoundError error when register not found in getById method', async () => {
    await expect(() => sut.getById(0)).rejects.toThrow(
      new NotFoundError(`Register not found using ID 0`),
    );
  });
  it('should throws NotFoundError error when register not found in update method', async () => {
    await expect(() =>
      sut.update(0, {
        status: 'VALIDADO',
      }),
    ).rejects.toThrow(new NotFoundError(`Register not found using ID 0`));
  });
});

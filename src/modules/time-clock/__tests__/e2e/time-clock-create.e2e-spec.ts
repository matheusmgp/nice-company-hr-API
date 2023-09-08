import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTimeClockDto } from '../../dto/create-time-clock.dto';
import { setupPrismaTests } from '../testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/env-config/env-config.module';
import { TimeClockModule } from '../../time-clock.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { applyGlobalConfig } from '@/global-config';
import { ITimeClockRepository } from '../../interfaces/timeclock.repository.interface';
import { TimeClockRepository } from '../../time-clock.repository';
import { TimeClock } from '../../entities/time-clock.entity';
import { formatCpfOnlyNumber } from '@/shared/utils/cpf.util';
import { formatPhoneOnlyNumber } from '@/shared/utils/phone.util';
import { TimeClockStatusEnum } from '@/shared/enums/time-clock-status.enum';

describe('TimeClock create e2e test', () => {
  let app: INestApplication;
  let module: TestingModule;
  const prismaService = new PrismaClient();
  let createDto: CreateTimeClockDto;
  let repository: ITimeClockRepository;
  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [
        EnvConfigModule,
        TimeClockModule,
        PrismaModule.forTest(prismaService),
      ],
    }).compile();
    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();
    repository = module.get<TimeClockRepository>(TimeClockRepository);
  });
  beforeEach(async () => {
    createDto = {
      name: 'test name',
      email: 'a@a.com',
      cpf: '604.123.903-88',
      phone: '(85) 99803-3564',
      knowledges: ['PHP', 'GIT', 'Typescript'],
    };
    await prismaService.register.deleteMany();
  });

  it('should create a register', async () => {
    const response = await request(app.getHttpServer())
      .post('/time-clock')
      .send(createDto)
      .expect(201);
    expect(response.body).toStrictEqual({
      data: {
        id: expect.any(Number),
        name: 'test name',
        email: 'a@a.com',
        cpf: '60412390388',
        phone: '85998033564',
        status: 'PENDENTE',
        assignedAt: expect.any(String),
        knowledges: 'PHP,GIT,Typescript',
        updatedAt: null,
      },
      statusCode: 201,
      method: 'POST',
      timestamp: expect.any(String),
    });
  });
  it('should create a register with empty phone field', async () => {
    const response = await request(app.getHttpServer())
      .post('/time-clock')
      .send({ ...createDto, phone: '' })
      .expect(201);
    expect(response.body).toStrictEqual({
      data: {
        id: expect.any(Number),
        name: 'test name',
        email: 'a@a.com',
        cpf: '60412390388',
        phone: '',
        status: 'PENDENTE',
        assignedAt: expect.any(String),
        knowledges: 'PHP,GIT,Typescript',
        updatedAt: null,
      },
      statusCode: 201,
      method: 'POST',
      timestamp: expect.any(String),
    });
  });
  it('should throws exception 422 when dto name field is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/time-clock')
      .send({ ...createDto, name: null })
      .expect(422);
    expect(res.body.statusCode).toBe(422);
    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toStrictEqual([
      'name must be shorter than or equal to 100 characters',
      'name must be a string',
      'name should not be empty',
    ]);
  });
  it('should throws exception 422 when dto email field is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/time-clock')
      .send({ ...createDto, email: null })
      .expect(422);
    expect(res.body.statusCode).toBe(422);
    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toStrictEqual([
      'email must be an email',
      'email must be shorter than or equal to 100 characters',
      'email must be a string',
      'email should not be empty',
    ]);
  });
  it('should throws exception 422 when dto cpf field is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/time-clock')
      .send({ ...createDto, cpf: null })
      .expect(422);
    expect(res.body.statusCode).toBe(422);
    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toStrictEqual([
      'cpf must be shorter than or equal to 14 characters',
      'cpf must be a string',
      'cpf should not be empty',
    ]);
  });
  it('should throws exception 422 when dto knowledges field is empty', async () => {
    const res = await request(app.getHttpServer())
      .post('/time-clock')
      .send({ ...createDto, knowledges: null })
      .expect(422);
    expect(res.body.statusCode).toBe(422);
    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toStrictEqual([
      'knowledges must be an array',
      'knowledges should not be empty',
    ]);
  });
  it('should throws exception 400 when cpf field already exists', async () => {
    const entity = new TimeClock({
      name: 'mock name',
      email: 'mock@email.com',
      cpf: formatCpfOnlyNumber('604.123.903-88'),
      phone: formatPhoneOnlyNumber('(85) 99803-3564'),
      knowledges: 'GIT,javascript,Typescript',
      status: TimeClockStatusEnum.PENDENTE,
    });
    const created = await prismaService.register.create({ data: entity.props });
    const res = await request(app.getHttpServer())
      .post('/time-clock')
      .send({ ...createDto, cpf: '604.123.903-88' })
      .expect(400);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.error).toBe('Bad Request');
    expect(res.body.message).toStrictEqual('604.123.903-88 já existe');
  });
});

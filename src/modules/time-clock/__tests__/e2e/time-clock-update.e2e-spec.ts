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
import { UpdateTimeClockDto } from '../../dto/update-time-clock.dto';

describe('TimeClock update e2e test', () => {
  let app: INestApplication;
  let module: TestingModule;
  const prismaService = new PrismaClient();
  let updateDto: UpdateTimeClockDto;
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
    updateDto = {
      status: 'VALIDADO',
    };
    await prismaService.register.deleteMany();
  });

  it('should update a register', async () => {
    const entity = new TimeClock({
      name: 'mock name',
      email: 'mock@email.com',
      cpf: formatCpfOnlyNumber('604.123.903-88'),
      phone: formatPhoneOnlyNumber('(85) 99803-3564'),
      knowledges: 'GIT,javascript,Typescript',
      status: TimeClockStatusEnum.PENDENTE,
    });
    const created = await prismaService.register.create({ data: entity.props });
    const response = await request(app.getHttpServer())
      .patch(`/time-clock/${created.id}`)
      .send(updateDto)
      .expect(200);
    expect(response.body).toStrictEqual({
      data: {
        id: expect.any(Number),
        name: entity.name,
        email: entity.email,
        cpf: entity.cpf,
        phone: entity.phone,
        status: 'VALIDADO',
        assignedAt: expect.any(String),
        knowledges: entity.knowledges,
        updatedAt: expect.any(String),
      },
      statusCode: 200,
      method: 'PATCH',
      timestamp: expect.any(String),
    });
  });
  it('should throws exception 422 when dto status field is empty', async () => {
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
      .patch(`/time-clock/${created.id}`)
      .send({})
      .expect(422);
    expect(res.body.statusCode).toBe(422);
    expect(res.body.error).toBe('Unprocessable Entity');
    expect(res.body.message).toStrictEqual([
      'status must be a string',
      'status should not be empty',
    ]);
  });
  it('should throws exception 404 when id not found', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/time-clock/${0}`)
      .send(updateDto)
      .expect(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.error).toBe('Not Found');
    expect(res.body.message).toStrictEqual('Register not found using ID 0');
  });
});

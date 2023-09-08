import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { setupPrismaTests } from '../../testing/setup-prisma-tests';
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

describe('TimeClock getById e2e test', () => {
  let app: INestApplication;
  let module: TestingModule;
  const prismaService = new PrismaClient();

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
    await prismaService.register.deleteMany();
  });

  it('should return one register', async () => {
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
      .get(`/time-clock/${created.id}`)
      .expect(200);
    expect(response.body).toStrictEqual({
      data: {
        id: expect.any(Number),
        name: entity.name,
        email: entity.email,
        cpf: entity.cpf,
        phone: entity.phone,
        status: entity.status,
        assignedAt: expect.any(String),
        knowledges: entity.knowledges,
        updatedAt: null,
      },
      statusCode: 200,
      method: 'GET',
      timestamp: expect.any(String),
    });
  });
  it('should throws exception 404 when id not found', async () => {
    const res = await request(app.getHttpServer())
      .get(`/time-clock/9999`)
      .expect(404);
    expect(res.body.statusCode).toBe(404);
    expect(res.body.message).toStrictEqual(' No Register found');
  });
});

import { HttpAdapterHost, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { TransformationInterceptor } from './shared/interceptors/http-global-interceptior';
import { PrismaClientExceptionFilter } from './shared/exceptions-filters/prisma-client-exception/prisma-client-exception.filter';
import { NotFoundErrorFilter } from './shared/exceptions-filters/not-found-error/not-found-error.filter';
import { ConflictErrorFilter } from './shared/exceptions-filters/conflict-error/conflict-error.filter';
import { DatabaseErrorFilter } from './shared/exceptions-filters/database-error/database-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new TransformationInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new NotFoundErrorFilter(),
    new ConflictErrorFilter(),
    new DatabaseErrorFilter(),
  );
}

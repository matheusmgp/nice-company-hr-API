import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyGlobalConfig } from './global-config';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  applyGlobalConfig(app);
  app.enableCors();
  const PREFIX = 'api/';
  const VERSION = 'v1';
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION],
    prefix: PREFIX,
  });
  await app.listen(3000);
}
bootstrap();

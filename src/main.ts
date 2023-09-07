import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyGlobalConfig } from './global-config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  applyGlobalConfig(app);
  await app.listen(3000);
}
bootstrap();

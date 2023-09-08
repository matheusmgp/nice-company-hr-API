import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { applyGlobalConfig } from './global-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  applyGlobalConfig(app);
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('NiceCompanyHR API')
    .setDescription('Back-end API for the NiceCompanyHR  application')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`docs`, app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

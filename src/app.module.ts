import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { EnvConfigModule } from './shared/env-config/env-config.module';
import { TimeClockModule } from './modules/time-clock/time-clock.module';

@Module({
  imports: [PrismaModule, EnvConfigModule, TimeClockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

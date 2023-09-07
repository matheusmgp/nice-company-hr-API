import { Module } from '@nestjs/common';

import { PrismaModule } from './modules/prisma/prisma.module';
import { EnvConfigModule } from './shared/env-config/env-config.module';
import { TimeClockModule } from './modules/time-clock/time-clock.module';

@Module({
  imports: [PrismaModule, EnvConfigModule, TimeClockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TimeClockService } from './time-clock.service';
import { TimeClockController } from './time-clock.controller';
import { ITimeClockService } from './interfaces/timeclock.service.interface';
import { ITimeClockRepository } from './interfaces/timeclock.repository.interface';
import { TimeClockRepository } from './time-clock.repository';
@Module({
  controllers: [TimeClockController],
  providers: [
    {
      provide: ITimeClockService,
      useClass: TimeClockService,
    },
    {
      provide: ITimeClockRepository,
      useClass: TimeClockRepository,
    },
    TimeClockRepository,
    TimeClockService,
  ],
  exports: [
    TimeClockRepository,
    TimeClockService,
    ITimeClockRepository,
    ITimeClockService,
  ],
})
export class TimeClockModule {}

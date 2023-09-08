import { Test, TestingModule } from '@nestjs/testing';
import { TimeClockController } from './time-clock.controller';
import { TimeClockService } from './time-clock.service';

describe('TimeClockController', () => {
  let controller: TimeClockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeClockController],
      providers: [TimeClockService],
    }).compile();

    controller = module.get<TimeClockController>(TimeClockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

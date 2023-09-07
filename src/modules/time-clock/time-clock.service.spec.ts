import { Test, TestingModule } from '@nestjs/testing';
import { TimeClockService } from './time-clock.service';

describe('TimeClockService', () => {
  let service: TimeClockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeClockService],
    }).compile();

    service = module.get<TimeClockService>(TimeClockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

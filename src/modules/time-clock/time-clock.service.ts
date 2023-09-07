import { Injectable } from '@nestjs/common';
import { CreateTimeClockDto } from './dto/create-time-clock.dto';
import { UpdateTimeClockDto } from './dto/update-time-clock.dto';

@Injectable()
export class TimeClockService {
  create(createTimeClockDto: CreateTimeClockDto) {
    return 'This action adds a new timeClock';
  }

  findAll() {
    return `This action returns all timeClock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeClock`;
  }

  update(id: number, updateTimeClockDto: UpdateTimeClockDto) {
    return `This action updates a #${id} timeClock`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeClock`;
  }
}

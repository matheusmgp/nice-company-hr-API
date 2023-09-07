import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeClockService } from './time-clock.service';
import { CreateTimeClockDto } from './dto/create-time-clock.dto';
import { UpdateTimeClockDto } from './dto/update-time-clock.dto';

@Controller('time-clock')
export class TimeClockController {
  constructor(private readonly timeClockService: TimeClockService) {}

  @Post()
  create(@Body() createTimeClockDto: CreateTimeClockDto) {
    return this.timeClockService.create(createTimeClockDto);
  }

  @Get()
  findAll() {
    return this.timeClockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeClockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeClockDto: UpdateTimeClockDto) {
    return this.timeClockService.update(+id, updateTimeClockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeClockService.remove(+id);
  }
}

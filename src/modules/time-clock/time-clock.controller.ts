import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
} from '@nestjs/common';
import { CreateTimeClockDto } from './dto/create-time-clock.dto';
import { UpdateTimeClockDto } from './dto/update-time-clock.dto';
import { ITimeClockService } from './interfaces/timeclock.service.interface';
import { mapperCreate } from './mapper/dto-to-entity';

@Controller('time-clock')
export class TimeClockController {
  constructor(
    @Inject(ITimeClockService)
    private readonly timeClockService: ITimeClockService,
  ) {}

  @Post()
  async create(@Body() dto: CreateTimeClockDto) {
    return await this.timeClockService.create(mapperCreate(dto));
  }

  @Get()
  async findAll() {
    return await this.timeClockService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('id', id);
    return await this.timeClockService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTimeClockDto) {
    return this.timeClockService.update(+id, dto);
  }
}

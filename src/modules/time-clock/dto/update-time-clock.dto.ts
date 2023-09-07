import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeClockDto } from './create-time-clock.dto';

export class UpdateTimeClockDto extends PartialType(CreateTimeClockDto) {}

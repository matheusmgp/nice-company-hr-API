import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTimeClockDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  status: string;
}

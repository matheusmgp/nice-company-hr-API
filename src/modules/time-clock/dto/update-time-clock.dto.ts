import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTimeClockDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}

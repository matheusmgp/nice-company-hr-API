import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTimeClockDto {
  @IsNotEmpty()
  @IsBoolean()
  status: string;
}

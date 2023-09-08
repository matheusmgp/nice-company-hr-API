import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTimeClockDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @ApiProperty()
  cpf: string;
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  knowledges: string[];
}

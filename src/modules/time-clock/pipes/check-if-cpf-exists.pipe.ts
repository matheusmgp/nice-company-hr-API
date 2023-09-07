import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ITimeClockService } from '../interfaces/timeclock.service.interface';
import { CreateTimeClockDto } from '../dto/create-time-clock.dto';

@Injectable()
export class CheckIfCpfExistsPipe implements PipeTransform {
  constructor(
    @Inject(ITimeClockService) private readonly service: ITimeClockService,
  ) {}
  async transform(value: CreateTimeClockDto, metadata: ArgumentMetadata) {
    let result = await this.service.getByCpf(value.cpf);
    if (result) {
      throw new BadRequestException(`${value.cpf} já existe`);
    }
    return value;
  }
}

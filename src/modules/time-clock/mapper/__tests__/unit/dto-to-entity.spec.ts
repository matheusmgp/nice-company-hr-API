import { CreateTimeClockDto } from '@/modules/time-clock/dto/create-time-clock.dto';
import { mapperCreate } from '../../dto-to-entity';
import { TimeClock } from '@/modules/time-clock/entities/time-clock.entity';

describe('DtoToEntity Mapper unit test', () => {
  it('should return a TimeClock entity', () => {
    const dto: CreateTimeClockDto = {
      name: 'mocked name',
      email: 'mock@mock.com',
      phone: '(85) 99803-3564',
      cpf: '604.147.258-99',
      knowledges: ['PHP', 'JAVASCRIPT', 'CSS'],
    };
    const entity = mapperCreate(dto);
    expect(entity).toBeInstanceOf(TimeClock);
    expect(entity).toHaveProperty('name', dto.name);
    expect(entity).toHaveProperty('email', dto.email);
    expect(entity).toHaveProperty('phone', '85998033564');
    expect(entity).toHaveProperty('cpf', '60414725899');
    expect(entity).toHaveProperty('knowledges', 'PHP,JAVASCRIPT,CSS');
    expect(entity).toHaveProperty('status', 'PENDENTE');
    expect(entity).not.toBeNull();
  });
});

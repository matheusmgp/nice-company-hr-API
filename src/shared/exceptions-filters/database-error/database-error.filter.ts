import { DatabaseError } from '@/shared/errors/database-error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch(DatabaseError)
export class DatabaseErrorFilter implements ExceptionFilter {
  catch(exception: DatabaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(500).send({
      statusCode: 500,
      error: 'Database connection problem',
      message: exception.message,
    });
  }
}

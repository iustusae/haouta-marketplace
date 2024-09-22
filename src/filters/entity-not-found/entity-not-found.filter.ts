import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    return response.status(HttpStatus.NOT_FOUND).json({
      message: {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Entity Not Found',
        message: exception.message,
      },
    });
  }
}

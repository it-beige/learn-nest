import {
  ArgumentsHost,
  Catch,
  ContextType,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { AaaException } from './aaa.exeception';

@Catch(HttpException)
export class AaaFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const statusCode = exception.getStatus();
    console.log('ExceptionFilter');
    response.status(statusCode).json({ msg: exception.message });
  }
}

export class CatchFilter implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    const type: ContextType = host.getType();
    const { aaa, bbb, getStatus } = exception;
    if (type === 'http') {
      const reponse: Response = host.switchToHttp().getResponse();
      return reponse.status(getStatus()).json({ aaa, bbb });
    }
  }
}

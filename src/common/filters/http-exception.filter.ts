import {
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  Catch,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from '../enums/evironment.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const env = this.configService.get<Environment>('NODE_ENV');

    const status = exception.getStatus();
    const message = exception.getResponse() as object;
    let trace: unknown;
    if (Environment.DEVELOPMENT === env) {
      trace = exception.stack;
    }

    response.status(status).json({
      ...message,
      trace,
    });
  }
}

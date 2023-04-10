import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from '../dtos/response.dto';
import { EnviromentVariablesEnum } from '../enums/environment-variables.enum';

@Catch()
export class ServerExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 'status' in exception ? exception.getStatus() : 500;
        const message = this.formulateExceptionMessage(exception);

        if (
            process.env[EnviromentVariablesEnum.NODE_ENV] === 'dev' ||
            process.env[EnviromentVariablesEnum.NODE_ENV] === 'homolog'
        ) {
            console.error(exception);
        }

        response.status(status).json(
            new ResponseDto(false, null, [
                {
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: message,
                },
            ]),
        );
    }

    private formulateExceptionMessage(exception: HttpException | Error) {
        if (process.env[EnviromentVariablesEnum.NODE_ENV] === 'dev') {
            if (exception instanceof HttpException) {
                const exceptionResponse = exception.getResponse() as any;
                if (exceptionResponse.errors) {
                    return exceptionResponse.errors;
                }
                if (exceptionResponse.message) {
                    return exceptionResponse.message;
                }
                return JSON.stringify(exceptionResponse);
            }
            return exception.message;
        }
        return 'Internal Error.';
    }
}

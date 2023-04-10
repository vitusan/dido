import { EnviromentVariablesEnum } from './../enums/environment-variables.enum';
import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import BooleanUtil from '../utils/boolean.util';
import CryptoUtil from '../utils/crypto.util';

export class EncryptInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const payloadKey = process.env[EnviromentVariablesEnum.JWT_FRONTEND_ENCRYPTION_KEY];
        const payload = context.switchToHttp().getRequest().body.payload;

        if (BooleanUtil.getBoolean(process.env[EnviromentVariablesEnum.ENABLE_DOCS])) {
            if (
                !!context
                    .switchToHttp()
                    .getRequest()
                    .headers.referer.match(new RegExp(`http://localhost:${process.env.PORT}/v[\\S]+/docs`, 'g'))
            ) {
                return next.handle();
            }
        }

        if (!payload)
            throw new HttpException(new ResponseDto(false, null, ['Payload is mandatory!']), HttpStatus.BAD_REQUEST);

        const decryptedBody = JSON.parse(
            CryptoUtil.decrypt(payloadKey, context.switchToHttp().getRequest().body.payload),
        );

        if (!decryptedBody)
            throw new HttpException(
                new ResponseDto(false, null, ['Error trying to decrypt the payload!']),
                HttpStatus.BAD_REQUEST,
            );

        context.switchToHttp().getRequest().body = decryptedBody;

        return next.handle();
    }
}

import { Type, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../../dtos/response.dto';

export const ApiBodyEncripted = <RequestDto extends Type<unknown>>({ type }: { type: RequestDto }) => {
    if (process.env.NODE_ENV === 'dev') {
        return applyDecorators(
            ApiExtraModels(ResponseDto, type),
            ApiBody({
                description: 'For locahost environments, while using swagger.',
                schema: {
                    allOf: [{ $ref: getSchemaPath(type) }],
                },
            }),
        );
    } else {
        return applyDecorators(
            ApiExtraModels(ResponseDto, type),
            ApiBody({
                description:
                    'For non-localhost environments and direct communication with the API, encrypt the payload using the cryptographic key of the platform and send the result of the cipher encapsulated in this object.',
                schema: {
                    properties: {
                        payload: {
                            type: 'string',
                        },
                    },
                },
            }),
        );
    }
};

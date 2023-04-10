import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../../dtos/response.dto';

export const ApiOkResponseDtoData = <DataDto extends Type<unknown>>({
    type,
    description = undefined,
    status = 200,
}: {
    type: DataDto;
    description?: string;
    status?: number;
}) =>
    applyDecorators(
        ApiExtraModels(ResponseDto, type),
        ApiOkResponse({
            description: description,
            status: status,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(type) },
                            },
                        },
                    },
                ],
            },
        }),
    );

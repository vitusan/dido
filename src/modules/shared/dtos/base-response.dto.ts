import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export abstract class BaseResponseDto {
    @ApiProperty({})
    @Expose()
    @Type(() => String)
    _id: string;
}

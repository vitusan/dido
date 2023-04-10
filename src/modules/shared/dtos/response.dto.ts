import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
    @ApiProperty({})
    success: boolean;

    data: T;

    @ApiProperty({})
    errors: any[] | null;

    constructor(success: boolean, data: T, errors: any) {
        this.success = success;
        this.data = data;
        this.errors = errors;
    }
}

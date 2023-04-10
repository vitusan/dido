import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
    @ApiProperty()
    zipcode: string;
    @ApiProperty()
    number: string;
    @ApiProperty()
    complement: string;
    @ApiProperty()
    district: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    latitude: string;
    @ApiProperty()
    longitude: string;
}

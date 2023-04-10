import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnviromentVariablesEnum } from '../shared/enums/environment-variables.enum';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get(EnviromentVariablesEnum.NOSQL_CONNECTION_STRING),
                useNewUrlParser: true,
            }),
            inject: [ConfigService],
        }),

        MongooseModule.forFeature([]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}

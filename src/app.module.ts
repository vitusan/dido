import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServerExceptionFilter } from './modules/shared/filters/exception.filter';
import { configuration } from 'config/env/configuration';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
            load: [configuration],
        }),
        DatabaseModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ServerExceptionFilter,
        },
    ],
})
export class AppModule {}

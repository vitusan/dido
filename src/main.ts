import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { EnviromentVariablesEnum } from './modules/shared/enums/environment-variables.enum';
import BooleanUtil from './modules/shared/utils/boolean.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerExceptionFilter } from './modules/shared/filters/exception.filter';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const configService = app.get(ConfigService);
    const logger = new Logger('main');

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.useGlobalFilters(new ServerExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    if (BooleanUtil.getBoolean(configService.get(EnviromentVariablesEnum.ENABLE_CORS))) {
        const corsOptions = {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: true,
            allowedHeaders: 'Content-Type, Accept, Authorization, Latitude-Longitude',
        };
        app.enableCors(corsOptions);

        logger.debug('CORS ENABLED');
    }

    const appVersion = configService.get(EnviromentVariablesEnum.APP_VERSION);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: appVersion,
    });

    if (BooleanUtil.getBoolean(configService.get(EnviromentVariablesEnum.ENABLE_DOCS))) {
        const swaggerOptions = new DocumentBuilder()
            .setTitle('Dido - API')
            .setVersion(appVersion)
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            })
            .build();

        const document = SwaggerModule.createDocument(app, swaggerOptions);
        SwaggerModule.setup('v' + appVersion + '/docs', app, document);

        logger.debug('DOCS ENABLED');
    }

    const port = configService.get(EnviromentVariablesEnum.PORT) || 3000;
    await app.listen(port);
    logger.log(`Dido - API started at port ${port}`);
}
bootstrap();

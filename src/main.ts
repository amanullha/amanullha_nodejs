import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    app.use(helmet());
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const port = configService.get('APP_PORT');

    await app.listen(port);
    console.log(`Running on port ${port}`);

}
bootstrap();

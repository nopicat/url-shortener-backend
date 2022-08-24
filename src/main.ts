import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api', {
        exclude: [{ path: '/:shortUrl', method: RequestMethod.ALL }],
    });

    const config = new DocumentBuilder()
        .setTitle('URL Shortener')
        .setDescription('The shortener API description')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, swaggerDocument);

    await app.listen(3000);
}

bootstrap();

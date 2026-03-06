import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('Portfolio Blog API')
        .setDescription('Full-stack portfolio blog API documentation')
        .setVersion('1.0.0')
        .addTag('projects', 'Projects management')
        .addTag('contacts', 'Contact form submissions')
        .addTag('auth', 'Authentication endpoints')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Portfolio Blog API running on http://localhost:${port}`);
}

bootstrap();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable CORS
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    });
    // Global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe());
    // Swagger documentation
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Portfolio Blog API')
        .setDescription('Full-stack portfolio blog API documentation')
        .setVersion('1.0.0')
        .addTag('projects', 'Projects management')
        .addTag('contacts', 'Contact form submissions')
        .addTag('auth', 'Authentication endpoints')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Portfolio Blog API running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
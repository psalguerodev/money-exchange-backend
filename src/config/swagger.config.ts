import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerInit(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Money Exchange API')
    .setDescription('The Money Exchange API description')
    .setSchemes("http", "https")
    .setBasePath('/v1')
    .setVersion('1.0')
    .addTag('exchange')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

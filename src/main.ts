import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerInit } from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import { Environment } from './config/environments.config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const serverConfig = config.get('server');
  const PORT = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === Environment.DEV) {
    app.enableCors();
    swaggerInit(app);
  } else {
    app.enableCors({ origin: serverConfig.origin });
  }

  app.setGlobalPrefix('/v1');

  await app.listen(PORT);
  logger.log(`Application listening on port [${PORT}]`);
}

bootstrap();

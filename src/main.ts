import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EntityNotFoundExceptionFilter } from './common/exceptions/entityNotFound.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger configuations
   */
  const options = new DocumentBuilder()
    .setTitle('Auth Server')
    .setDescription('Auth Server API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   *  Filter configurations
   */
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  /**
   *  Pipes configurations
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

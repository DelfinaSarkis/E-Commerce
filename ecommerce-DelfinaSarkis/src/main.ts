import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/auth0.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map((error) => {
        return { property: error.property, constraints: error.constraints };
      });
      return new BadRequestException({
        alert: 'Se han detectado los siguientes errores en la petición: ',
        errors: cleanErrors,
      })
    }
  }));

  const swaggerConfig = new DocumentBuilder()
                            .setTitle('Api Trabajo M4')
                            .setDescription('Esta es una API construida con Nest en la cual se presenta toda la estructura del trabajo con los respectivos endpoints y sus funciones')
                            .setVersion('1.0')
                            .addBearerAuth()
                            .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

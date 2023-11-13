import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'config/document/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import admin from 'firebase-admin';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  admin.initializeApp({
    credential: admin.credential.cert(join('./firebase-service.json')),
    storageBucket: process.env.STORAGE_BUCKET,
  });

  await app.enableCors({
    allowedHeaders: ['Authorization'],
    credentials: true
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

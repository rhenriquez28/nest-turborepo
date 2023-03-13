import { NestFactory } from '@nestjs/core';
import { NestApp2Module } from './nest-app-2.module';

async function bootstrap() {
  const app = await NestFactory.create(NestApp2Module);
  await app.listen(3000);
}
bootstrap();

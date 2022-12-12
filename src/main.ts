import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('W4 Project')
  .setDescription('Simple dApp for voting.')
  .setVersion('1.0')
  .addTag('Web 3.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

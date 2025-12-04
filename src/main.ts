import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import * as dotenv from 'dotenv';
import ormConfig from '../ormconfig';

dotenv.config();

async function bootstrap() {
  // initialize TypeORM
  await ormConfig.initialize();
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '2mb' }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();

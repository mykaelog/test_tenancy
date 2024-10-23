import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = app.get<ConfigService>(ConfigService);
  const prefix = config.get<string>('app.prefix');
  const port = config.get<number>('app.port');

  app.setGlobalPrefix(prefix);
  app.enableCors();

  await app.listen(port);
}

bootstrap();

import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: false,
  logging: process.env.DB_LOG === 'true',
};

export const dbConfig = registerAs('db', () => ({
  ...databaseConfig,
  prefix: process.env.DB_PREFIX,
}));

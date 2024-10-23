import { registerAs } from '@nestjs/config';

export const envConfig = registerAs('env', () => ({
  tz: process.env.NODE_TZ,
  env: process.env.NODE_ENV,
}));

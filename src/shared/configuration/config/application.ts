import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  prefix: process.env.APP_PREFIX,
  docs: process.env.APP_DOCS,
  appType: process.env.APP_TYPE,
}));

import { registerAs } from '@nestjs/config';

export const refocalConfig = registerAs('refocal', () => ({
  name: process.env.REFOCAL_NAME,
  version: process.env.REFOCAL_VERSION,
  country: process.env.REFOCAL_COUNTRY,
  url: process.env.REFOCAL_URL,
}));

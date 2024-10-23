import { envConfig } from './environment';
import { appConfig } from './application';
import { dbConfig } from './database';
import { jwtConfig } from './jwt';
import { refocalConfig } from './refocal';

const applicationConfig = [
  envConfig,
  appConfig,
  dbConfig,
  jwtConfig,
  refocalConfig,
];

export default applicationConfig;

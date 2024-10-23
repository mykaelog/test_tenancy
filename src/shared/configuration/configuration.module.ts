import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [...applicationConfig],
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigurationModule {}

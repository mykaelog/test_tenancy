import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppLoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { TenancyModule } from './tenancy/tenancy.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigurationModule,
    DatabaseModule,
    TenancyModule,
    AppLoggerModule,
  ],
  providers: [],
  exports: [AppLoggerModule],
})
export class SharedModule {}

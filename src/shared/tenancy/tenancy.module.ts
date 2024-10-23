import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenancyService } from './tenancy.service';
import { TenancyProviderFactory } from './tenancy.provider';
import { TenancyMiddleware } from './tenancy.middleware';
import { DataSourceRegistryService } from './data-source-registry.service';

import { TenantEntity } from '../../common/entities/tenant.entity';
import { TenancyRepository } from '../../common/repositories/tenancy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [],
  providers: [
    TenancyService,
    TenancyRepository,
    DataSourceRegistryService,
    TenancyProviderFactory.createTenantProvider(),
  ],
  exports: [TenancyProviderFactory.createTenantProvider()],
})
export class TenancyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenancyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

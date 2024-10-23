import { Injectable, NotFoundException, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { Request } from 'express';

import { TenancyService } from './tenancy.service';
import { DataSourceRegistryService } from './data-source-registry.service';

@Injectable()
export class TenancyProviderFactory {
  static createTenantProvider(): Provider {
    return {
      provide: 'TENANT_CONNECTION',
      inject: [REQUEST, TenancyService, DataSourceRegistryService],
      scope: Scope.REQUEST,
      useFactory: async (
        req: Request,
        tenantService: TenancyService,
        registry: DataSourceRegistryService,
      ): Promise<DataSource> => {
        const name = req.tenantId;
        const tenant = await tenantService.findTenantByName(name);
        if (!tenant) {
          throw new NotFoundException('TENANT_NOT_FOUND');
        }

        if (registry.has(tenant.name)) {
          return registry.get(tenant.name);
        }

        tenantService.setTenant(tenant.name);
        await tenantService.ensureTenantDatabase();
        const source = await tenantService.createTenantConnection();

        return source;
      },
    };
  }
}

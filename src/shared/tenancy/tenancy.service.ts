import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { DataSourceRegistryService } from './data-source-registry.service';
import { TenancyRepository } from '../../common/repositories/tenancy.repository';
import { TenantEntity } from '../../common/entities/tenant.entity';

@Injectable()
export class TenancyService implements OnApplicationShutdown {
  private tenantName: string;

  constructor(
    private readonly dataSource: DataSource,
    private readonly tenantRepo: TenancyRepository,
    private readonly registry: DataSourceRegistryService,
  ) {}

  setTenant(tenantName: string) {
    this.tenantName = tenantName;
  }

  async findTenantByName(name: string): Promise<TenantEntity> {
    return await this.tenantRepo.findTenantByName(name);
  }

  async ensureTenantDatabase(): Promise<void> {
    const database = await this.dataSource.query(
      `SELECT datname FROM pg_database WHERE datname = 'test_tenant_${this.tenantName}'`,
    );
    if (database.length === 0) {
      await this.dataSource.query(
        `CREATE DATABASE test_tenant_${this.tenantName}`,
      );
    }
  }

  async createTenantConnection(): Promise<DataSource> {
    const options = {
      ...this.dataSource.options,
      name: `test_tenant_${this.tenantName}`,
      database: `test_tenant_${this.tenantName}`,
      entities: [
        `dist/common/entities/*{.ts,.js}`,
        `dist/src/common/entities/*{.ts,.js}`,
      ],
      migrations: [
        `dist/migrations/common/*{.ts,.js}`,
        `dist/migrations/${this.tenantName}/*{.ts,.js}`,
      ],
    };

    const source = addTransactionalDataSource({
      name: `tenant_${this.tenantName}`,
      dataSource: new DataSource(options as DataSourceOptions),
    });
    console.log('CREATE_CONNECTION');
    try {
      await source.initialize();
      // await source.runMigrations();
    } catch {
      this.registry.delete(this.tenantName);
    }

    this.registry.set(this.tenantName, source);

    return source;
  }

  async onApplicationShutdown(signal: string) {
    console.log(`Received shutdown signal: ${signal}`);

    for (const [tenantName, dataSource] of this.registry.mapped.entries()) {
      await dataSource.destroy();
      this.registry.delete(tenantName);
    }
  }
}

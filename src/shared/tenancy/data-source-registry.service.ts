import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DataSourceRegistryService {
  public mapped: Map<string, DataSource> = new Map<string, DataSource>();

  set(tenantName: string, dataSource: DataSource): void {
    this.mapped.set(tenantName, dataSource);
  }

  get(tenantName: string): DataSource {
    return this.mapped.get(tenantName);
  }

  has(tenantName: string): boolean {
    return this.mapped.has(tenantName);
  }

  delete(tenantName: string): void {
    this.mapped.delete(tenantName);
  }
}

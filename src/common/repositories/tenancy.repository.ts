import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class TenancyRepository extends Repository<TenantEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TenantEntity, dataSource.createEntityManager());
  }

  async findTenantByName(name: string): Promise<TenantEntity> {
    return await this.findOne({ where: { name } });
  }
}

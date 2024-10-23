import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RatingEntity } from '../entities/rating.entity';
import { RatingDto } from '../dtos/rating.dto';

@Injectable()
export class RatingRepository extends Repository<RatingEntity> {
  constructor(
    @Inject('TENANT_CONNECTION')
    private readonly dataSource: DataSource,
  ) {
    console.log('REPOSITORY', dataSource.options);
    super(RatingEntity, dataSource.createEntityManager());
  }

  async throwError(): Promise<any> {
    throw new NotImplementedException('FROM REPO Exception');
  }

  async getAllRatings(relations: string[] = null): Promise<RatingEntity[]> {
    return await this.find({ relations });
  }

  async getRating(
    id: number,
    relations: string[] = null,
  ): Promise<RatingEntity> {
    return await this.findOne({ where: { id }, relations });
  }

  async createRating(data: Partial<RatingDto>): Promise<RatingEntity> {
    const entity = this.create(data);
    return await this.save(entity, { reload: true });
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Injectable,
  Module,
  Post,
  Scope,
  Type,
} from '@nestjs/common';
import { RatingRepository } from '../../common/repositories/rating.repository';
import { ModuleRef } from '@nestjs/core';
import { TenancyModule } from '../../shared/tenancy/tenancy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from '../../common/entities/rating.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

interface RatingServiceInterface {
  create(data: any): Promise<any>;
}

export class RatingDto {
  @Expose()
  @IsString()
  name: string;
}

@Injectable()
export class RatingLoader {
  constructor(
    private readonly ratingRepo: RatingRepository,
    private readonly moduleRef: ModuleRef,
  ) {}

  async loadService(id: number): Promise<RatingServiceInterface> {
    const product = await this.ratingRepo.findOne({
      select: ['id', 'name', 'productId'],
      where: { id },
    });

    try {
      const service = this.moduleRef.get<RatingServiceInterface>(
        RatingService,
        {
          strict: false,
        },
      );

      return service;
    } catch {
      throw new BadRequestException('RATING_PRODUCT_NOT_EXISTS');
    }
  }

  getServiceName(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
@Injectable()
export class RatingServiceValidation {
  constructor(private readonly validationPipe: ValidationPipe) {}

  async validate(data: unknown, type: Type<any>): Promise<boolean> {
    await this.validationPipe.transform(data, {
      metatype: type,
      data: undefined,
      type: 'body',
    });

    return true;
  }
}

@Injectable()
export class RatingService implements RatingServiceInterface {
  constructor(
    private readonly events: EventEmitter2,
    private readonly ratingRepo: RatingRepository,
    private readonly validator: RatingServiceValidation,
  ) {}
  async create(data: any): Promise<any> {
    // console.log(this.ratingRepo);
    await this.validator.validate(data, RatingDto);
    return this.ratingRepo.throwError();
  }
}

@Controller('rating')
export class RatingController {
  constructor(private readonly loader: RatingLoader) {}

  @Post()
  async create(@Body() data: any): Promise<any> {
    const { productId } = data;
    const service = await this.loader.loadService(productId);
    console.log(service);

    return service.create(data);
  }
}

@Module({
  imports: [TenancyModule, TypeOrmModule.forFeature([RatingEntity])],
  controllers: [RatingController],
  providers: [
    RatingLoader,
    RatingService,
    RatingRepository,
    ValidationPipe,
    RatingServiceValidation,
  ],
  exports: [],
})
export class RatingModule {}

import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class RatingDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id: number;

  @Expose()
  @IsNumber()
  productId: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsDate()
  deletedAt: Date;
}

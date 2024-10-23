import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'rating',
})
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'product_id',
  })
  productId: number;

  @Column()
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    update: true,
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}

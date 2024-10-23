import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRating1707474586987 implements MigrationInterface {
  name = 'CreateRating1707474586987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${process.env.DB_PREFIX}rating" (
        "id" SERIAL NOT NULL, 
        "product_id" integer NOT NULL,
        "name" character varying DEFAULT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "deleted_at" TIMESTAMP, 
        CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "${process.env.DB_PREFIX}rating"`);
  }
}

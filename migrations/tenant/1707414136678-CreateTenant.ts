import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenant1707414136678 implements MigrationInterface {
  name = 'CreateTenant1707414136678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "${process.env.DB_PREFIX}tenant" (
        id SERIAL NOT NULL, 
        "name" varchar NOT NULL, 
        CONSTRAINT "PK_fb207ea9e8dec69a4cbda0ec21d" PRIMARY KEY (id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "${process.env.DB_PREFIX}tenant"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenant1707414136679 implements MigrationInterface {
  name = 'AddTenant1707414136679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "${process.env.DB_PREFIX}tenant" (name) VALUES ('inbonis'), ('ksa');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "${process.env.DB_PREFIX}tenant"`);
  }
}

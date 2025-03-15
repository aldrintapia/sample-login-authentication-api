import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserInitialData1728473567238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "users"("username", "password", "email", "created_date", "updated_date") VALUES ('admin', '$2b$10$.YF9.XBz7FjxeXOB2nO67Ox7OGpVWbEpLT6Iwbf4K7BdNxS1lgSga', 'princealdrintapia@gmail.com', DEFAULT, DEFAULT) RETURNING "id", "email", "created_date", "updated_date"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE username = 'admin'`);
  }
}

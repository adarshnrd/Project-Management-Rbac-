import { MigrationInterface, QueryRunner } from 'typeorm';

export class Refactor1735562680026 implements MigrationInterface {
  name = 'Refactor1735562680026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`key\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`firstName\` text NOT NULL, \`lastName\` text NULL, \`email\` varchar(255) NOT NULL, \`phone\` text NULL, \`companyName\` text NOT NULL, \`verifiedUser\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` (\`id\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Refactor1742555075677 implements MigrationInterface {
  name = 'Refactor1742555075677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`userRole\` (\`key\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`role\` varchar(255) NOT NULL DEFAULT 'ServiceUser', UNIQUE INDEX \`IDX_590284dbe757b096997b79f1cf\` (\`id\`), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`timeSheet\` (\`key\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`date\` date NOT NULL, \`projectName\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`workingPosition\` varchar(255) NOT NULL, \`hoursSpent\` int NOT NULL, \`userKey\` int NULL, UNIQUE INDEX \`IDX_4232934373cfce11b81f8f54f0\` (\`id\`), UNIQUE INDEX \`IDX_fd3c141b52be9345459223c826\` (\`date\`, \`userKey\`), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`key\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`firstName\` text NOT NULL, \`lastName\` text NULL, \`email\` varchar(255) NOT NULL, \`phone\` text NULL, \`companyName\` text NOT NULL, \`verifiedUser\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NULL, \`roleModelKey\` int NULL, UNIQUE INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` (\`id\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_7951e2838c15f2e03c91ff7298\` (\`roleModelKey\`), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`timeSheet\` ADD CONSTRAINT \`FK_45e10161ae181a04cda907605d3\` FOREIGN KEY (\`userKey\`) REFERENCES \`users\`(\`key\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_7951e2838c15f2e03c91ff72982\` FOREIGN KEY (\`roleModelKey\`) REFERENCES \`userRole\`(\`key\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_7951e2838c15f2e03c91ff72982\``);
    await queryRunner.query(`ALTER TABLE \`timeSheet\` DROP FOREIGN KEY \`FK_45e10161ae181a04cda907605d3\``);
    await queryRunner.query(`DROP INDEX \`REL_7951e2838c15f2e03c91ff7298\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP INDEX \`IDX_fd3c141b52be9345459223c826\` ON \`timeSheet\``);
    await queryRunner.query(`DROP INDEX \`IDX_4232934373cfce11b81f8f54f0\` ON \`timeSheet\``);
    await queryRunner.query(`DROP TABLE \`timeSheet\``);
    await queryRunner.query(`DROP INDEX \`IDX_590284dbe757b096997b79f1cf\` ON \`userRole\``);
    await queryRunner.query(`DROP TABLE \`userRole\``);
  }
}

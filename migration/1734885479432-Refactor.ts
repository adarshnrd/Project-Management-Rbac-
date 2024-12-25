import { MigrationInterface, QueryRunner } from "typeorm";

export class Refactor1734885479432 implements MigrationInterface {
    name = 'Refactor1734885479432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`key\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(36) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT 0, \`firstName\` text NOT NULL, \`lastName\` text NULL, \`email\` text NOT NULL, \`phone\` text NULL, \`companyName\` text NOT NULL, UNIQUE INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` (\`id\`), PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}

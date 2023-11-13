import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1695541954780 implements MigrationInterface {
    name = 'InitDb1695541954780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`role\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`role_name\` varchar(255) NOT NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user-role\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`role_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`create_by\` varchar(255) NULL,
                \`updatedAt\` timestamp NULL,
                \`update_by\` varchar(255) NULL,
                \`isActive\` tinyint NOT NULL DEFAULT 0,
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`firstName\` varchar(255) NOT NULL,
                \`lastName\` varchar(255) NOT NULL,
                \`provider_type\` enum ('ACCOUNT', 'GOOGLE') NOT NULL DEFAULT 'ACCOUNT',
                \`address\` text NULL,
                \`avatar\` varchar(255) NULL,
                \`gender\` enum ('FEMALE', 'MALE') NULL,
                \`password\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`refresh_token\` varchar(255) NULL,
                INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` (\`firstName\`),
                INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` (\`lastName\`),
                UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`user-role\`
            ADD CONSTRAINT \`FK_3bd2c3a4a6887df272b970d09c9\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`user-role\`
            ADD CONSTRAINT \`FK_1988d5ebb4d4b58a0edade9b190\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user-role\` DROP FOREIGN KEY \`FK_1988d5ebb4d4b58a0edade9b190\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`user-role\` DROP FOREIGN KEY \`FK_3bd2c3a4a6887df272b970d09c9\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user-role\`
        `);
        await queryRunner.query(`
            DROP TABLE \`role\`
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelation1699966320974 implements MigrationInterface {
    name = 'ChangeRelation1699966320974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bc096b4e18b1f9508197cd98066\``);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`conversationId\` \`conversationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`senderId\` \`senderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP FOREIGN KEY \`FK_c308b1cd542522bb66430fa860a\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`conversation\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` DROP FOREIGN KEY \`FK_99aa095bfe87979846a33745185\``);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`create_by\` \`create_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`update_by\` \`update_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`certification\` \`certification\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`time_begin\` \`time_begin\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`time_end\` \`time_end\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` ADD UNIQUE INDEX \`IDX_99aa095bfe87979846a3374518\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`create_by\` \`create_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_by\` \`update_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` enum ('FEMALE', 'MALE') NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_99aa095bfe87979846a3374518\` ON \`doctor_register\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_bc096b4e18b1f9508197cd98066\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD CONSTRAINT \`FK_c308b1cd542522bb66430fa860a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` ADD CONSTRAINT \`FK_99aa095bfe87979846a33745185\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctor_register\` DROP FOREIGN KEY \`FK_99aa095bfe87979846a33745185\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP FOREIGN KEY \`FK_c308b1cd542522bb66430fa860a\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bc096b4e18b1f9508197cd98066\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`DROP INDEX \`REL_99aa095bfe87979846a3374518\` ON \`doctor_register\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`gender\` \`gender\` enum ('FEMALE', 'MALE') NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`address\` \`address\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_by\` \`update_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`create_by\` \`create_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` DROP INDEX \`IDX_99aa095bfe87979846a3374518\``);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`time_end\` \`time_end\` datetime NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`time_begin\` \`time_begin\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`certification\` \`certification\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`update_by\` \`update_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`updatedAt\` \`updatedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`create_by\` \`create_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` ADD CONSTRAINT \`FK_99aa095bfe87979846a33745185\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`conversation\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD CONSTRAINT \`FK_c308b1cd542522bb66430fa860a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`senderId\` \`senderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`conversationId\` \`conversationId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`message\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_bc096b4e18b1f9508197cd98066\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

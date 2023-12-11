import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1702308830652 implements MigrationInterface {
    name = 'InitDb1702308830652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`booking_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`appointment_id\` int NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appointment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fromDate\` datetime NULL, \`toDate\` datetime NULL, \`doctor_id\` int NOT NULL, \`patient_id\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`clientId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` varchar(255) NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`conversationId\` int NULL, \`senderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`name\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`doctor_register\` (\`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`create_by\` varchar(255) NULL, \`updatedAt\` timestamp NULL, \`update_by\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NULL, \`certification\` varchar(255) NULL, \`email\` varchar(255) NULL, \`time_begin\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`time_end\` datetime NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` int NOT NULL, UNIQUE INDEX \`REL_99aa095bfe87979846a3374518\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`specialized\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`doctor_specialized\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`specialized_id\` int NOT NULL, \`exp\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feedback\` (\`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`create_by\` varchar(255) NULL, \`updatedAt\` timestamp NULL, \`update_by\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`id\` int NOT NULL AUTO_INCREMENT, \`start\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`doctor_id\` int NOT NULL, \`patient_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`create_by\` varchar(255) NULL, \`updatedAt\` timestamp NULL, \`update_by\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`provider_type\` enum ('ACCOUNT', 'GOOGLE') NOT NULL DEFAULT 'ACCOUNT', \`address\` text NULL, \`symptom\` varchar(255) NULL, \`insurance\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`gender\` enum ('FEMALE', 'MALE') NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NULL, INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` (\`firstName\`), INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` (\`lastName\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user-role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message_seen_user\` (\`messageId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_c21c891b92da6024fad2bea31a\` (\`messageId\`), INDEX \`IDX_2473255a879a9deeddb33ff7fe\` (\`userId\`), PRIMARY KEY (\`messageId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`booking_history\` ADD CONSTRAINT \`FK_0b6aae47f7663531ffafa3611bc\` FOREIGN KEY (\`appointment_id\`) REFERENCES \`appointment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_9a9c484aa4a944eaec632e00a81\` FOREIGN KEY (\`doctor_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointment\` ADD CONSTRAINT \`FK_86b3e35a97e289071b4785a1402\` FOREIGN KEY (\`patient_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_bc096b4e18b1f9508197cd98066\` FOREIGN KEY (\`senderId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD CONSTRAINT \`FK_0825886afb03b1a6f11345b4e8c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` ADD CONSTRAINT \`FK_99aa095bfe87979846a33745185\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_specialized\` ADD CONSTRAINT \`FK_8bdbf36bcfb8efc98ab0753ed1f\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`doctor_specialized\` ADD CONSTRAINT \`FK_1667aac9112b7596c80b10946dc\` FOREIGN KEY (\`specialized_id\`) REFERENCES \`specialized\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_8978ace7b1879155c9a91c65628\` FOREIGN KEY (\`doctor_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_0f6440572de2848ac610c274831\` FOREIGN KEY (\`patient_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-role\` ADD CONSTRAINT \`FK_3bd2c3a4a6887df272b970d09c9\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user-role\` ADD CONSTRAINT \`FK_1988d5ebb4d4b58a0edade9b190\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message_seen_user\` ADD CONSTRAINT \`FK_c21c891b92da6024fad2bea31ac\` FOREIGN KEY (\`messageId\`) REFERENCES \`message\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`message_seen_user\` ADD CONSTRAINT \`FK_2473255a879a9deeddb33ff7fe3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message_seen_user\` DROP FOREIGN KEY \`FK_2473255a879a9deeddb33ff7fe3\``);
        await queryRunner.query(`ALTER TABLE \`message_seen_user\` DROP FOREIGN KEY \`FK_c21c891b92da6024fad2bea31ac\``);
        await queryRunner.query(`ALTER TABLE \`user-role\` DROP FOREIGN KEY \`FK_1988d5ebb4d4b58a0edade9b190\``);
        await queryRunner.query(`ALTER TABLE \`user-role\` DROP FOREIGN KEY \`FK_3bd2c3a4a6887df272b970d09c9\``);
        await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_0f6440572de2848ac610c274831\``);
        await queryRunner.query(`ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_8978ace7b1879155c9a91c65628\``);
        await queryRunner.query(`ALTER TABLE \`doctor_specialized\` DROP FOREIGN KEY \`FK_1667aac9112b7596c80b10946dc\``);
        await queryRunner.query(`ALTER TABLE \`doctor_specialized\` DROP FOREIGN KEY \`FK_8bdbf36bcfb8efc98ab0753ed1f\``);
        await queryRunner.query(`ALTER TABLE \`doctor_register\` DROP FOREIGN KEY \`FK_99aa095bfe87979846a33745185\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP FOREIGN KEY \`FK_0825886afb03b1a6f11345b4e8c\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bc096b4e18b1f9508197cd98066\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_86b3e35a97e289071b4785a1402\``);
        await queryRunner.query(`ALTER TABLE \`appointment\` DROP FOREIGN KEY \`FK_9a9c484aa4a944eaec632e00a81\``);
        await queryRunner.query(`ALTER TABLE \`booking_history\` DROP FOREIGN KEY \`FK_0b6aae47f7663531ffafa3611bc\``);
        await queryRunner.query(`DROP INDEX \`IDX_2473255a879a9deeddb33ff7fe\` ON \`message_seen_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_c21c891b92da6024fad2bea31a\` ON \`message_seen_user\``);
        await queryRunner.query(`DROP TABLE \`message_seen_user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`user-role\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0e1b4ecdca13b177e2e3a0613\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_58e4dbff0e1a32a9bdc861bb29\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`feedback\``);
        await queryRunner.query(`DROP TABLE \`doctor_specialized\``);
        await queryRunner.query(`DROP TABLE \`specialized\``);
        await queryRunner.query(`DROP INDEX \`REL_99aa095bfe87979846a3374518\` ON \`doctor_register\``);
        await queryRunner.query(`DROP TABLE \`doctor_register\``);
        await queryRunner.query(`DROP TABLE \`conversation\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP TABLE \`appointment\``);
        await queryRunner.query(`DROP TABLE \`booking_history\``);
    }

}

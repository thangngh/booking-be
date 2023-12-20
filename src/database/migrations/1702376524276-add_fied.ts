import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFied1702376524276 implements MigrationInterface {
    name = 'AddFied1702376524276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD \`isActive\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP COLUMN \`isActive\``);
    }

}

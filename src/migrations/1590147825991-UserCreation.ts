import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCreation1590147825991 implements MigrationInterface {
    name = 'UserCreation1590147825991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueForPasswordAndPhoto1691785863100 implements MigrationInterface {
    name = 'RemoveUniqueForPasswordAndPhoto1691785863100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_638bac731294171648258260ff2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_2ca4287be6514df9dc12a9d850c"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_2ca4287be6514df9dc12a9d850c" UNIQUE ("photo")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password")`);
    }

}

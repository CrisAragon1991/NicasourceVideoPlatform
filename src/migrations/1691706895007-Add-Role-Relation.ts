import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleRelation1691706895007 implements MigrationInterface {
    name = 'AddRoleRelation1691706895007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "follow_user" DROP CONSTRAINT "FK_4ad7c05b439f35092dffcdeb97a"')
        await queryRunner.query('ALTER TABLE "user" ADD "roleId" integer')
        await queryRunner.query('ALTER TABLE "follow_user" ADD CONSTRAINT "FK_4ad7c05b439f35092dffcdeb97a" FOREIGN KEY ("followeruserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
        await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"')
        await queryRunner.query('ALTER TABLE "follow_user" DROP CONSTRAINT "FK_4ad7c05b439f35092dffcdeb97a"')
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN "roleId"')
        await queryRunner.query('ALTER TABLE "follow_user" ADD CONSTRAINT "FK_4ad7c05b439f35092dffcdeb97a" FOREIGN KEY ("followeruserId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

}

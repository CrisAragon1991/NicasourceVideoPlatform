import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeVideoDescriptionNullable1691863347754 implements MigrationInterface {
    name = 'MakeVideoDescriptionNullable1691863347754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "video" ALTER COLUMN "description" DROP NOT NULL')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "video" ALTER COLUMN "description" SET NOT NULL')
    }

}

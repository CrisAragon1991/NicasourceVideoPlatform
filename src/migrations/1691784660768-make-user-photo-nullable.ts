import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeUserPhotoNullable1691784660768 implements MigrationInterface {
    name = 'MakeUserPhotoNullable1691784660768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "photo" DROP NOT NULL')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "photo" SET NOT NULL')
    }

}

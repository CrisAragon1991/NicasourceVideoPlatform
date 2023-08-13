import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameReactions1691898654991 implements MigrationInterface {
    name = 'RenameReactions1691898654991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."reaction_reactiontype_enum" RENAME TO "reaction_reactiontype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."reaction_reactiontype_enum" AS ENUM('Like', 'DisLike', 'It is funny', 'Im Angry', 'I love it')`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "reactionType" TYPE "public"."reaction_reactiontype_enum" USING "reactionType"::"text"::"public"."reaction_reactiontype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."reaction_reactiontype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reaction_reactiontype_enum_old" AS ENUM('Like', 'DisLike', 'Is funny', 'Im Angry', 'I love')`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "reactionType" TYPE "public"."reaction_reactiontype_enum_old" USING "reactionType"::"text"::"public"."reaction_reactiontype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."reaction_reactiontype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."reaction_reactiontype_enum_old" RENAME TO "reaction_reactiontype_enum"`);
    }

}

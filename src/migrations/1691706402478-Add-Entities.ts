import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1691706402478 implements MigrationInterface {
    name = 'AddEntities1691706402478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reaction_reactiontype_enum" AS ENUM('Like', 'DisLike')`);
        await queryRunner.query(`CREATE TABLE "reaction" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "id" SERIAL NOT NULL, "reactionType" "public"."reaction_reactiontype_enum" NOT NULL, "videoId" integer, "userId" integer, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "video" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "patch" character varying NOT NULL, "published" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "id" SERIAL NOT NULL, "followeruserId" integer, "followedUserId" integer, CONSTRAINT "PK_d3b514cd26ff6190a8f836f9b28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" numeric NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_638bac731294171648258260ff2" UNIQUE ("password"), CONSTRAINT "UQ_2ca4287be6514df9dc12a9d850c" UNIQUE ("photo"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteDate" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_a9ec542f8e67572e4570b4f4058" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_74e27b13f8ac66f999400df12f6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_user" ADD CONSTRAINT "FK_4ad7c05b439f35092dffcdeb97a" FOREIGN KEY ("followeruserId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_user" ADD CONSTRAINT "FK_04cb5d5164df4333fd08a34b830" FOREIGN KEY ("followedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow_user" DROP CONSTRAINT "FK_04cb5d5164df4333fd08a34b830"`);
        await queryRunner.query(`ALTER TABLE "follow_user" DROP CONSTRAINT "FK_4ad7c05b439f35092dffcdeb97a"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_74e27b13f8ac66f999400df12f6"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_a9ec542f8e67572e4570b4f4058"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "follow_user"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TYPE "public"."reaction_reactiontype_enum"`);
    }

}

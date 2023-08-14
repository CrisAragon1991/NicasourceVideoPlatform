import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleSeeder1691800070266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO public."role" ("createdAt", "updatedAt", "deleteDate", "name") VALUES('2023-08-11 18:30:12.217', '2023-08-11 18:30:12.217', NULL, 'Student');
        INSERT INTO public."role" ("createdAt", "updatedAt", "deleteDate", "name") VALUES('2023-08-11 18:30:12.223', '2023-08-11 18:30:12.223', NULL, 'Teacher');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM public."role" WHERE id=1;
        DELETE FROM public."role" WHERE id=2;
        `)
    }

}

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUsersSeeder1691800401924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO public."user" ("createdAt", "updatedAt", "deleteDate", "firstName", "lastName", age, email, "password", photo, "roleId") VALUES('2023-08-11 21:15:24.161', '2023-08-11 21:15:24.161', NULL, '${process.env.DB_USER}', '${process.env.DB_USER}', 30, '${process.env.DB_USER}@gmail.com', '$2b$12$P11AK0jO5qmLpo1Z40BUWOhdCKDwMxciEjwmlQlYrobHHQs1x1fYS', NULL, 1);
        INSERT INTO public."user" ("createdAt", "updatedAt", "deleteDate", "firstName", "lastName", age, email, "password", photo, "roleId") VALUES('2023-08-11 22:19:36.544', '2023-08-11 22:19:36.544', NULL, '${process.env.DB_USER}', '${process.env.DB_USER}', 30, '${process.env.DB_USER}2@gmail.com', '$2b$12$NgW.1UTSKSaxCGSfKg4gMe2G7rr19GJ5fsauMhyj/uBsYPDimcJmm', NULL, 2);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DELETE FROM public."user" WHERE id=1;
        DELETE FROM public."user" WHERE id=2;
        `)
    }
}

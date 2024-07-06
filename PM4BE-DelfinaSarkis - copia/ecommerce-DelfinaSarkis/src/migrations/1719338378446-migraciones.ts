import { MigrationInterface, QueryRunner } from "typeorm";

export class Migraciones1719338378446 implements MigrationInterface {
    name = 'Migraciones1719338378446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "relación-producto/ordenDetail" ("productsId" uuid NOT NULL, "ordersDetailsId" uuid NOT NULL, CONSTRAINT "PK_44c0cebffc00e0f8244dd7c101d" PRIMARY KEY ("productsId", "ordersDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0320a00e047423114fee5f18ef" ON "relación-producto/ordenDetail" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c5afb7c3acb16bb51af5c01cc" ON "relación-producto/ordenDetail" ("ordersDetailsId") `);
        await queryRunner.query(`ALTER TABLE "relación-producto/ordenDetail" ADD CONSTRAINT "FK_0320a00e047423114fee5f18eff" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "relación-producto/ordenDetail" ADD CONSTRAINT "FK_0c5afb7c3acb16bb51af5c01cc2" FOREIGN KEY ("ordersDetailsId") REFERENCES "ordersDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "relación-producto/ordenDetail" DROP CONSTRAINT "FK_0c5afb7c3acb16bb51af5c01cc2"`);
        await queryRunner.query(`ALTER TABLE "relación-producto/ordenDetail" DROP CONSTRAINT "FK_0320a00e047423114fee5f18eff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c5afb7c3acb16bb51af5c01cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0320a00e047423114fee5f18ef"`);
        await queryRunner.query(`DROP TABLE "relación-producto/ordenDetail"`);
    }

}

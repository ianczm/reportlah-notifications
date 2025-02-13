import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "channels" ADD COLUMN "recipient_type_label" varchar;
    UPDATE "channels" SET "recipient_type_label" = 'default_recipient_type_label' WHERE "recipient_type_label" IS NULL;
    ALTER TABLE "channels" ALTER COLUMN "recipient_type_label" SET NOT NULL;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "channels" DROP COLUMN IF EXISTS "recipient_type_label";`);
}

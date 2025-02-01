import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`

    ALTER TABLE "channels" ALTER COLUMN "name" DROP NOT NULL;
    
    ALTER TABLE "channels" ADD COLUMN "provider" varchar;
    ALTER TABLE "channels" ADD COLUMN "recipient_type" varchar;

    UPDATE "channels" SET "provider" = 'default_provider' WHERE "provider" IS NULL;
    UPDATE "channels" SET "recipient_type" = 'default_recipient' WHERE "recipient_type" IS NULL;

    ALTER TABLE "channels" ALTER COLUMN "provider" SET NOT NULL;
    ALTER TABLE "channels" ALTER COLUMN "recipient_type" SET NOT NULL;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`

    UPDATE "channels" 
    SET "name" = "provider" || ' | ' || "recipient_type"
    WHERE "name" IS NULL;

    ALTER TABLE "channels" ALTER COLUMN "name" SET NOT NULL;
    ALTER TABLE "channels" DROP COLUMN IF EXISTS "provider";
    ALTER TABLE "channels" DROP COLUMN IF EXISTS "recipient_type";`);
}

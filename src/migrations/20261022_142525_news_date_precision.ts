import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_news_date_precision" AS ENUM('day', 'month');
  CREATE TYPE "public"."enum__news_v_version_date_precision" AS ENUM('day', 'month');
  ALTER TABLE "news" ADD COLUMN "date_precision" "enum_news_date_precision" DEFAULT 'day';
  ALTER TABLE "_news_v" ADD COLUMN "version_date_precision" "enum__news_v_version_date_precision" DEFAULT 'day';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "news" DROP COLUMN "date_precision";
  ALTER TABLE "_news_v" DROP COLUMN "version_date_precision";
  DROP TYPE "public"."enum_news_date_precision";
  DROP TYPE "public"."enum__news_v_version_date_precision";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "saagdo_page" ADD COLUMN "video_url" varchar;
  ALTER TABLE "_saagdo_page_v" ADD COLUMN "version_video_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "saagdo_page" DROP COLUMN "video_url";
  ALTER TABLE "_saagdo_page_v" DROP COLUMN "version_video_url";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "saagdo_page" ADD COLUMN "screenshot_platform_id" integer;
  ALTER TABLE "saagdo_page" ADD COLUMN "screenshot_app_id" integer;
  ALTER TABLE "_saagdo_page_v" ADD COLUMN "version_screenshot_platform_id" integer;
  ALTER TABLE "_saagdo_page_v" ADD COLUMN "version_screenshot_app_id" integer;
  ALTER TABLE "saagdo_page" ADD CONSTRAINT "saagdo_page_screenshot_platform_id_media_id_fk" FOREIGN KEY ("screenshot_platform_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "saagdo_page" ADD CONSTRAINT "saagdo_page_screenshot_app_id_media_id_fk" FOREIGN KEY ("screenshot_app_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v" ADD CONSTRAINT "_saagdo_page_v_version_screenshot_platform_id_media_id_fk" FOREIGN KEY ("version_screenshot_platform_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v" ADD CONSTRAINT "_saagdo_page_v_version_screenshot_app_id_media_id_fk" FOREIGN KEY ("version_screenshot_app_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "saagdo_page_screenshot_platform_idx" ON "saagdo_page" USING btree ("screenshot_platform_id");
  CREATE INDEX "saagdo_page_screenshot_app_idx" ON "saagdo_page" USING btree ("screenshot_app_id");
  CREATE INDEX "_saagdo_page_v_version_version_screenshot_platform_idx" ON "_saagdo_page_v" USING btree ("version_screenshot_platform_id");
  CREATE INDEX "_saagdo_page_v_version_version_screenshot_app_idx" ON "_saagdo_page_v" USING btree ("version_screenshot_app_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "saagdo_page" DROP CONSTRAINT "saagdo_page_screenshot_platform_id_media_id_fk";
  
  ALTER TABLE "saagdo_page" DROP CONSTRAINT "saagdo_page_screenshot_app_id_media_id_fk";
  
  ALTER TABLE "_saagdo_page_v" DROP CONSTRAINT "_saagdo_page_v_version_screenshot_platform_id_media_id_fk";
  
  ALTER TABLE "_saagdo_page_v" DROP CONSTRAINT "_saagdo_page_v_version_screenshot_app_id_media_id_fk";
  
  DROP INDEX "saagdo_page_screenshot_platform_idx";
  DROP INDEX "saagdo_page_screenshot_app_idx";
  DROP INDEX "_saagdo_page_v_version_version_screenshot_platform_idx";
  DROP INDEX "_saagdo_page_v_version_version_screenshot_app_idx";
  ALTER TABLE "saagdo_page" DROP COLUMN "screenshot_platform_id";
  ALTER TABLE "saagdo_page" DROP COLUMN "screenshot_app_id";
  ALTER TABLE "_saagdo_page_v" DROP COLUMN "version_screenshot_platform_id";
  ALTER TABLE "_saagdo_page_v" DROP COLUMN "version_screenshot_app_id";`)
}

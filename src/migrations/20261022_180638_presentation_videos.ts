import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN "intro_video_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "intro_video_poster_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_intro_video_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_intro_video_poster_id" integer;
  ALTER TABLE "saagdo_page" ADD COLUMN "video_id" integer;
  ALTER TABLE "saagdo_page" ADD COLUMN "video_poster_id" integer;
  ALTER TABLE "_saagdo_page_v" ADD COLUMN "version_video_id" integer;
  ALTER TABLE "_saagdo_page_v" ADD COLUMN "version_video_poster_id" integer;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_intro_video_id_media_id_fk" FOREIGN KEY ("intro_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_intro_video_poster_id_media_id_fk" FOREIGN KEY ("intro_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_intro_video_id_media_id_fk" FOREIGN KEY ("version_intro_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_intro_video_poster_id_media_id_fk" FOREIGN KEY ("version_intro_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "saagdo_page" ADD CONSTRAINT "saagdo_page_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "saagdo_page" ADD CONSTRAINT "saagdo_page_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v" ADD CONSTRAINT "_saagdo_page_v_version_video_id_media_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_saagdo_page_v" ADD CONSTRAINT "_saagdo_page_v_version_video_poster_id_media_id_fk" FOREIGN KEY ("version_video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_intro_intro_video_idx" ON "homepage" USING btree ("intro_video_id");
  CREATE INDEX "homepage_intro_intro_video_poster_idx" ON "homepage" USING btree ("intro_video_poster_id");
  CREATE INDEX "_homepage_v_version_intro_version_intro_video_idx" ON "_homepage_v" USING btree ("version_intro_video_id");
  CREATE INDEX "_homepage_v_version_intro_version_intro_video_poster_idx" ON "_homepage_v" USING btree ("version_intro_video_poster_id");
  CREATE INDEX "saagdo_page_video_idx" ON "saagdo_page" USING btree ("video_id");
  CREATE INDEX "saagdo_page_video_poster_idx" ON "saagdo_page" USING btree ("video_poster_id");
  CREATE INDEX "_saagdo_page_v_version_version_video_idx" ON "_saagdo_page_v" USING btree ("version_video_id");
  CREATE INDEX "_saagdo_page_v_version_version_video_poster_idx" ON "_saagdo_page_v" USING btree ("version_video_poster_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" DROP CONSTRAINT "homepage_intro_video_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_intro_video_poster_id_media_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_intro_video_id_media_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_intro_video_poster_id_media_id_fk";
  
  ALTER TABLE "saagdo_page" DROP CONSTRAINT "saagdo_page_video_id_media_id_fk";
  
  ALTER TABLE "saagdo_page" DROP CONSTRAINT "saagdo_page_video_poster_id_media_id_fk";
  
  ALTER TABLE "_saagdo_page_v" DROP CONSTRAINT "_saagdo_page_v_version_video_id_media_id_fk";
  
  ALTER TABLE "_saagdo_page_v" DROP CONSTRAINT "_saagdo_page_v_version_video_poster_id_media_id_fk";
  
  DROP INDEX "homepage_intro_intro_video_idx";
  DROP INDEX "homepage_intro_intro_video_poster_idx";
  DROP INDEX "_homepage_v_version_intro_version_intro_video_idx";
  DROP INDEX "_homepage_v_version_intro_version_intro_video_poster_idx";
  DROP INDEX "saagdo_page_video_idx";
  DROP INDEX "saagdo_page_video_poster_idx";
  DROP INDEX "_saagdo_page_v_version_version_video_idx";
  DROP INDEX "_saagdo_page_v_version_version_video_poster_idx";
  ALTER TABLE "homepage" DROP COLUMN "intro_video_id";
  ALTER TABLE "homepage" DROP COLUMN "intro_video_poster_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_intro_video_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_intro_video_poster_id";
  ALTER TABLE "saagdo_page" DROP COLUMN "video_id";
  ALTER TABLE "saagdo_page" DROP COLUMN "video_poster_id";
  ALTER TABLE "_saagdo_page_v" DROP COLUMN "version_video_id";
  ALTER TABLE "_saagdo_page_v" DROP COLUMN "version_video_poster_id";`)
}

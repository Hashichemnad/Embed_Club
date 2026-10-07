import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * @payloadcms/storage-s3 3.90 stores each upload's object key in a new
 * `_objectKey` field on every collection it manages. The field only exists
 * when USE_S3_STORAGE=true, so this migration was generated with storage on.
 * IF NOT EXISTS keeps it safe on local databases built either way.
 */

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  ALTER TABLE "member_photo" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  ALTER TABLE "form_media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery" DROP COLUMN IF EXISTS "_objectkey";
  ALTER TABLE "member_photo" DROP COLUMN IF EXISTS "_objectkey";
  ALTER TABLE "form_media" DROP COLUMN IF EXISTS "_objectkey";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey";`)
}

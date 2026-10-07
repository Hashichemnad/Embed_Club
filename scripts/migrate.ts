/**
 * Applies pending migrations from src/migrations.
 *
 * Same job as `payload migrate`, run through tsx directly for the reason given
 * in scripts/generateImportMap.ts: the Payload CLI can exit silently before
 * doing anything, which would deploy code against an unmigrated schema.
 */
import 'dotenv/config'
import config from '@payload-config'
import { getPayload } from 'payload'

async function main() {
  const payload = await getPayload({ config })
  await payload.db.migrate()
  console.log('Migrations up to date.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

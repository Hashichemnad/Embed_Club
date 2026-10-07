/**
 * Writes src/app/(payload)/admin/importMap.js.
 *
 * Same job as `payload generate:importmap`, but run through tsx directly. The
 * Payload CLI starts itself through an async loader hook and can exit before
 * it has done anything - silently, with exit code 0 - which on Hostinger left
 * the build without an import map and failed `next build`. Running the
 * generator ourselves makes the step either succeed or fail loudly.
 */
import 'dotenv/config'
import config from '@payload-config'
import { generateImportMap } from 'payload'

async function main() {
  await generateImportMap(await config, { force: true, log: true })
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

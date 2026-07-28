/**
 * Seeds the Botnizer site structure into the current database.
 * Run with: pnpm payload run scripts/seed-botnizer.ts
 *
 * Existing pages, solutions and case studies are removed first, so the script
 * can be re-run safely.
 *
 * IMPORTANT: restart the dev server (or delete `.next`) afterwards. Seeding from
 * a CLI script cannot invalidate Next's cache — see the note in
 * src/endpoints/seed/botnizer.ts — so the header and footer will otherwise keep
 * rendering their pre-seed state.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { seedBotnizer } from '../src/endpoints/seed/botnizer'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config: configPromise })

  for (const collection of ['pages', 'case-studies', 'solutions'] as const) {
    await payload.delete({
      collection,
      context: { disableRevalidate: true },
      where: { id: { exists: true } },
    })
  }

  // A single placeholder standing in for the design's photography, so layouts
  // can be reviewed before the real Figma exports are uploaded.
  const placeholder = await payload.create({
    collection: 'media',
    data: { alt: 'Placeholder' },
    filePath: path.resolve(dirname, '../src/endpoints/seed/image-hero1.webp'),
  })

  await seedBotnizer({ payload, imageId: placeholder.id })
}

try {
  await run()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}

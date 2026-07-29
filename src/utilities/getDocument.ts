import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { buildSafeQuery, emptyPaginatedDocs } from './buildSafeQuery'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const page = await buildSafeQuery(emptyPaginatedDocs<{ id: number }>(), async () =>
    (await getPayload({ config: configPromise })).find({
      collection,
      depth,
      where: {
        slug: {
          equals: slug,
        },
      },
    }),
  )

  return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })

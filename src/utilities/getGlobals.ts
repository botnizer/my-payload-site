import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { buildSafeQuery } from './buildSafeQuery'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<DataFromGlobalSlug<T>> {
  // The header and footer render in the root layout, so every page depends on
  // this query. Guarded so a build against a not-yet-migrated database produces
  // an empty header and footer rather than failing outright.
  return buildSafeQuery({} as DataFromGlobalSlug<T>, async () => {
    const payload = await getPayload({ config: configPromise })

    return payload.findGlobal({
      slug,
      depth,
    })
  })
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

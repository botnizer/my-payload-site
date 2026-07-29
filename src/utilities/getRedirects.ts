import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { buildSafeQuery, emptyPaginatedDocs } from './buildSafeQuery'
import type { Redirect } from '@/payload-types'

export async function getRedirects(depth = 1) {
  // Runs on every page via PayloadRedirects, so guard it the same way as the
  // globals: a build before migrations should yield no redirects, not a failure.
  const { docs: redirects } = await buildSafeQuery(emptyPaginatedDocs<Redirect>(), async () =>
    (await getPayload({ config: configPromise })).find({
      collection: 'redirects',
      depth,
      limit: 0,
      pagination: false,
    }),
  )

  return redirects
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  })

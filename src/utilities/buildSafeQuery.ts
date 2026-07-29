import type { PaginatedDocs } from 'payload'

/**
 * Wraps a database query that runs during `next build`.
 *
 * On a fresh deployment the build runs before migrations have been applied, so
 * these queries can hit a database with no tables. Failing the build in that
 * case is unhelpful — the affected pages render on demand once the server is
 * up. Fall back to an empty result instead, and say so in the build log.
 */
export const buildSafeQuery = async <T>(fallback: T, query: () => Promise<T>): Promise<T> => {
  try {
    return await query()
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    console.warn(
      `[build] Database query failed, continuing without pre-rendering. ` +
        `Expected on a first deploy, before migrations have run. Cause: ${message}`,
    )

    return fallback
  }
}

/** An empty result matching the shape `payload.find` returns. */
export const emptyPaginatedDocs = <T>(): PaginatedDocs<T> =>
  ({
    docs: [] as T[],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 0,
    nextPage: null,
    page: 1,
    pagingCounter: 0,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0,
  }) as PaginatedDocs<T>

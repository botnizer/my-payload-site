import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Solution } from '../../../payload-types'

/**
 * Solutions have no route of their own — they surface as cards inside pages
 * (the offerings grid, the footer product list). There is no reliable way to
 * know which pages embed a given solution, so any change flushes the whole
 * layout rather than a single path.
 */
export const revalidateSolution: CollectionAfterChangeHook<Solution> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating all pages after change to solution: ${doc.slug}`)

    revalidatePath('/', 'layout')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Solution> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/', 'layout')
  }

  return doc
}

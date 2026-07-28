import React from 'react'

import type { CaseStudy } from '@/payload-types'

import { Media } from '@/components/Media'
import Link from 'next/link'

/**
 * The Success Stories card: image, challenge headline, then the one-line
 * solution and results, as it appears throughout the design.
 */
export const CaseStudyCard: React.FC<{ doc: CaseStudy }> = ({ doc }) => {
  const { heroImage, resultsSummary, slug, solutionSummary, title } = doc
  const href = `/case-studies/${slug}`

  return (
    <article className="flex h-full flex-col gap-4">
      <Link className="overflow-hidden rounded-xl" href={href}>
        {heroImage && typeof heroImage === 'object' ? (
          <Media imgClassName="aspect-[4/3] w-full object-cover" resource={heroImage} />
        ) : (
          <div className="aspect-[4/3] w-full bg-muted" />
        )}
      </Link>

      <h3 className="text-lg font-semibold">
        <Link href={href}>{title}</Link>
      </h3>

      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
        {solutionSummary && (
          <p>
            <span className="font-semibold text-foreground">Solution:</span> {solutionSummary}
          </p>
        )}
        {resultsSummary && (
          <p>
            <span className="font-semibold text-foreground">Results:</span> {resultsSummary}
          </p>
        )}
      </div>

      <Link className="mt-auto text-sm font-medium text-brand-green hover:underline" href={href}>
        Read More →
      </Link>
    </article>
  )
}

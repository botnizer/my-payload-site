import React from 'react'

import type { Solution, SolutionsGridBlock as SolutionsGridBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const SolutionsGridBlock: React.FC<SolutionsGridBlockProps & { id?: string }> = (props) => {
  const { eyebrow, heading, intro, solutions } = props

  // Depth-limited queries can leave these as IDs; only populated docs can render.
  const items = (solutions || []).filter(
    (solution): solution is Solution => typeof solution === 'object',
  )

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-3 text-center">
        {eyebrow && <p className="text-sm text-brand-green">{eyebrow}</p>}
        {heading && <h2 className="max-w-3xl text-4xl font-bold tracking-tight">{heading}</h2>}
        {intro && <p className="max-w-2xl text-muted-foreground">{intro}</p>}
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {items.map((solution) => {
          const link = solution.links?.[0]?.link

          return (
            <li
              className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8"
              key={solution.id}
            >
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-semibold">{solution.title}</h3>
                {solution.shortDescription && (
                  <p className="text-sm text-muted-foreground">{solution.shortDescription}</p>
                )}
              </div>

              {solution.image && typeof solution.image === 'object' && (
                <Media
                  className="mt-auto overflow-hidden rounded-xl"
                  imgClassName="w-full object-cover"
                  resource={solution.image}
                />
              )}

              {link && (
                <CMSLink
                  {...link}
                  appearance="inline"
                  className="text-sm font-medium text-brand-green hover:underline"
                  label={link.label || 'Learn more'}
                />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

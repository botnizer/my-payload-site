import React from 'react'

import type { FeatureRowBlock as FeatureRowBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const FeatureRowBlock: React.FC<FeatureRowBlockProps & { id?: string }> = (props) => {
  const { bullets, description, heading, image, links, mediaPosition } = props
  const link = links?.[0]?.link

  return (
    <div className="container">
      <div className="grid items-center gap-10 rounded-2xl bg-card p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
        <div
          className={cn(
            'flex flex-col gap-6',
            // Source order stays text-first for screen readers; only the visual
            // column swaps when the design flips the media to the left.
            mediaPosition === 'left' && 'lg:order-2',
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}

          {bullets && bullets.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {bullets.map((bullet, i) => (
                <li
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  key={i}
                >
                  {bullet.label}
                </li>
              ))}
            </ul>
          )}

          {link && (
            <CMSLink
              {...link}
              appearance="inline"
              className="text-sm font-medium text-brand-green hover:underline"
            />
          )}
        </div>

        {image && typeof image === 'object' && (
          <Media
            className={cn(
              'overflow-hidden rounded-xl',
              mediaPosition === 'left' && 'lg:order-1',
            )}
            imgClassName="w-full object-cover"
            resource={image}
          />
        )}
      </div>
    </div>
  )
}

import React from 'react'

import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { StarIcon } from 'lucide-react'

export const TestimonialBlock: React.FC<TestimonialBlockProps & { id?: string }> = (props) => {
  const { avatar, name, quote, rating, role } = props

  return (
    <div className="container">
      <figure className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 text-center">
        {typeof rating === 'number' && rating > 0 && (
          <div aria-label={`${rating} out of 5`} className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                className={
                  i < rating ? 'h-4 w-4 fill-brand-orange text-brand-orange' : 'h-4 w-4 text-border'
                }
                key={i}
              />
            ))}
          </div>
        )}

        <blockquote className="text-xl leading-relaxed">“{quote}”</blockquote>

        <figcaption className="flex items-center gap-3">
          {avatar && typeof avatar === 'object' && (
            <Media
              htmlElement={null}
              imgClassName="h-12 w-12 rounded-full object-cover"
              resource={avatar}
            />
          )}
          <div className="text-left">
            {name && <div className="font-semibold">{name}</div>}
            {role && <div className="text-sm text-muted-foreground">{role}</div>}
          </div>
        </figcaption>
      </figure>
    </div>
  )
}

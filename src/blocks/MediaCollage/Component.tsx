import React from 'react'

import type { MediaCollageBlock as MediaCollageBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const MediaCollageBlock: React.FC<MediaCollageBlockProps & { id?: string }> = (props) => {
  const { heading, images } = props

  return (
    <div className="container">
      {heading && <h2 className="mb-8 text-3xl font-bold tracking-tight">{heading}</h2>}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images?.map((item, i) => (
          <li
            // The design leads with one wide image, then a regular grid
            className={i === 0 ? 'sm:col-span-2' : undefined}
            key={i}
          >
            {typeof item.image === 'object' && (
              <Media
                className="overflow-hidden rounded-xl"
                imgClassName="aspect-[16/9] w-full object-cover"
                resource={item.image}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

import React from 'react'

import type { TrustBarBlock as TrustBarBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const TrustBarBlock: React.FC<TrustBarBlockProps & { id?: string }> = (props) => {
  const { eyebrow, heading, logos } = props

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-2 text-center">
        {eyebrow && <p className="text-lg font-light">{eyebrow}</p>}
        {heading && <h2 className="text-4xl font-semibold tracking-tight">{heading}</h2>}
      </div>

      {logos && logos.length > 0 && (
        <ul className="mt-12 grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((item, i) => (
            <li
              className="flex items-center justify-center border-r border-b border-border px-6 py-10"
              key={i}
            >
              {typeof item.logo === 'object' && (
                <Media
                  alt={item.name || ''}
                  htmlElement={null}
                  imgClassName="max-h-8 w-auto object-contain"
                  resource={item.logo}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

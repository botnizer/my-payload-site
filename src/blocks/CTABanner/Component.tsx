import React from 'react'

import type { CTABannerBlock as CTABannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const CTABannerBlock: React.FC<CTABannerBlockProps & { id?: string }> = (props) => {
  const { description, image, links, title } = props
  const link = links?.[0]?.link

  return (
    <div className="container">
      {/* Radial charcoal gradient, matching the banner fill in the design */}
      <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(120%_180%_at_50%_-40%,#565656_0%,#3e3e3e_41%,#262626_82%)] text-white">
        <div className="relative z-10 flex max-w-[32rem] flex-col gap-6 px-8 py-14 md:px-20">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl leading-tight font-medium md:text-[2.125rem]">{title}</h2>
            {description && <p className="text-lg leading-relaxed">{description}</p>}
          </div>
          {link && <CMSLink {...link} appearance="brand" className="self-start" size="pill" />}
        </div>

        {image && typeof image === 'object' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Media
              className="h-full"
              imgClassName="h-full w-full object-cover object-left"
              resource={image}
            />
          </div>
        )}
      </div>
    </div>
  )
}

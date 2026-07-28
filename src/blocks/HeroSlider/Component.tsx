'use client'

import React, { useCallback, useEffect, useState } from 'react'

import type { HeroSliderBlock as HeroSliderBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const HeroSliderBlock: React.FC<HeroSliderBlockProps & { id?: string }> = (props) => {
  const { autoplaySeconds, slides } = props
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const count = slides?.length || 0
  const advance = useCallback(() => setActive((i) => (i + 1) % count), [count])

  useEffect(() => {
    // Respect a disabled autoplay, a single slide, and users who have paused it
    if (!autoplaySeconds || count < 2 || paused) return

    const timer = setInterval(advance, autoplaySeconds * 1000)
    return () => clearInterval(timer)
  }, [advance, autoplaySeconds, count, paused])

  if (!count) return null

  return (
    <section
      className="relative -mt-[85px] min-h-[80vh] overflow-hidden text-white"
      data-theme="dark"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          aria-hidden={i !== active}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === active ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          key={i}
        >
          {typeof slide.image === 'object' && (
            <Media
              fill
              imgClassName="object-cover"
              priority={i === 0}
              resource={slide.image}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 container flex min-h-[80vh] flex-col justify-center gap-6 pt-[85px] pb-20">
        {slides.map((slide, i) => {
          const link = slide.links?.[0]?.link

          return (
            <div
              className={cn('max-w-2xl flex-col gap-6', i === active ? 'flex' : 'hidden')}
              key={i}
            >
              {slide.eyebrow && <p className="text-brand-green">{slide.eyebrow}</p>}
              <h1 className="text-4xl leading-tight font-bold md:text-6xl">{slide.heading}</h1>
              {slide.description && <p className="text-lg">{slide.description}</p>}
              {link && <CMSLink {...link} appearance="brand" className="self-start" size="pill" />}
            </div>
          )
        })}

        {count > 1 && (
          <div className="mt-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === active ? 'w-8 bg-brand-green' : 'w-2 bg-white/50 hover:bg-white',
                )}
                key={i}
                onClick={() => setActive(i)}
                type="button"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

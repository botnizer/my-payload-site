'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  /* Heroes with full-bleed media set the header theme to dark, which floats the
   * bar over the image instead of sitting on a solid background. */
  const isOverlay = theme === 'dark'
  const logo = data?.logo

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        isOverlay
          ? 'bg-brand-charcoal/80 text-white backdrop-blur-sm'
          : 'border-b border-border bg-background',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-[85px] items-center justify-between gap-6">
        <Link className="flex items-center" href="/">
          {logo && typeof logo === 'object' ? (
            <Media
              htmlElement={null}
              imgClassName="h-[34px] w-auto max-w-[9.375rem] object-contain"
              loading="eager"
              priority
              resource={logo}
            />
          ) : (
            <Logo
              className={cn(!isOverlay && 'invert')}
              loading="eager"
              priority="high"
            />
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

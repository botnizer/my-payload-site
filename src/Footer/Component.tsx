import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  type LucideIcon,
} from 'lucide-react'

const socialIcons: Record<string, LucideIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: TwitterIcon,
  youtube: YoutubeIcon,
}

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const columns = footerData?.columns || []
  const socialLinks = footerData?.socialLinks || []
  const ctaCard = footerData?.ctaCard
  const ctaLink = ctaCard?.links?.[0]?.link
  const logo = footerData?.logo

  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground">
      <div className="container py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {footerData?.heading && (
            <h2 className="text-4xl font-semibold md:text-5xl">{footerData.heading}</h2>
          )}
          {footerData?.tagline && (
            <p className="text-sm text-muted-foreground md:max-w-md md:justify-self-end">
              {footerData.tagline}
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(3,1fr)_1.4fr]">
          <Link className="flex items-start" href="/">
            {logo && typeof logo === 'object' ? (
              <Media
                htmlElement={null}
                imgClassName="h-[34px] w-auto max-w-[9.375rem] object-contain"
                resource={logo}
              />
            ) : (
              <Logo className="invert" />
            )}
          </Link>

          {columns.map((column, i) => (
            <nav key={i}>
              <h3 className="mb-4 text-sm font-semibold">{column.label}</h3>
              <ul className="flex flex-col gap-2">
                {column.navItems?.map(({ link }, j) => (
                  <li key={j}>
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {ctaCard?.title && (
            <div className="rounded-xl bg-muted p-6">
              <h3 className="text-sm font-semibold">{ctaCard.title}</h3>
              {ctaCard.description && (
                <p className="mt-2 text-sm text-muted-foreground">{ctaCard.description}</p>
              )}
              {ctaLink && (
                <CMSLink
                  {...ctaLink}
                  appearance="inline"
                  className="mt-4 inline-block text-sm font-medium text-brand-green hover:underline"
                />
              )}
            </div>
          )}
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">{footerData?.copyright}</p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ platform, url }, i) => {
              const Icon = socialIcons[platform]

              if (!Icon) return null

              return (
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                  href={url}
                  key={i}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">{platform}</span>
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}

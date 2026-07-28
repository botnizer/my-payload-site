'use client'

import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from 'lucide-react'

type NavItem = NonNullable<HeaderType['navItems']>[number]

const DesktopItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const { dropdownItems, enableDropdown, link } = item

  if (!enableDropdown || !dropdownItems?.length) {
    return <CMSLink {...link} appearance="inline" className="text-sm hover:opacity-70" />
  }

  return (
    <div className="group relative">
      <button
        aria-haspopup="true"
        className="flex cursor-pointer items-center gap-1 text-sm hover:opacity-70"
        type="button"
      >
        {link.label}
        <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      {/* pt-3 keeps the hover target continuous between the trigger and the panel */}
      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="w-72 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg">
          {dropdownItems.map((dropdownItem, i) => (
            <li key={i}>
              <CMSLink
                {...dropdownItem.link}
                appearance="inline"
                className="block rounded-md px-3 py-2 hover:bg-accent"
                label={null}
              >
                <span className="block text-sm font-medium">{dropdownItem.link.label}</span>
                {dropdownItem.description && (
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {dropdownItem.description}
                  </span>
                )}
              </CMSLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="hidden items-center gap-8 lg:flex">
        {navItems.map((item, i) => (
          <DesktopItem item={item} key={i} />
        ))}
        <Link className="hover:opacity-70" href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5" />
        </Link>
      </nav>

      <div className="flex items-center gap-4 lg:hidden">
        <Link className="hover:opacity-70" href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5" />
        </Link>
        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="cursor-pointer"
          onClick={() => setMobileOpen((open) => !open)}
          type="button"
        >
          {mobileOpen ? <XIcon className="w-6" /> : <MenuIcon className="w-6" />}
        </button>
      </div>

      {/* Positioned against the sticky <header>, which establishes the containing block */}
      <div
        className={cn(
          'absolute left-0 top-full w-full border-t border-border bg-background text-foreground shadow-lg lg:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <ul className="container flex flex-col py-4">
          {navItems.map(({ dropdownItems, enableDropdown, link }, i) => (
            <li className="border-b border-border last:border-b-0" key={i}>
              <CMSLink {...link} appearance="inline" className="block py-3 font-medium" />
              {enableDropdown && dropdownItems?.length ? (
                <ul className="mb-3 flex flex-col gap-2 pl-4">
                  {dropdownItems.map((dropdownItem, j) => (
                    <li key={j}>
                      <CMSLink
                        {...dropdownItem.link}
                        appearance="inline"
                        className="block text-sm text-muted-foreground"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

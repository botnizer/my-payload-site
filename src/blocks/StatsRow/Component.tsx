import React from 'react'

import type { StatsRowBlock as StatsRowBlockProps } from '@/payload-types'

export const StatsRowBlock: React.FC<StatsRowBlockProps & { id?: string }> = (props) => {
  const { heading, intro, stats } = props

  return (
    <div className="container">
      {(heading || intro) && (
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {heading && (
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">{heading}</h2>
          )}
          {intro && <p className="max-w-md text-lg text-muted-foreground">{intro}</p>}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats?.map((stat, i) => (
          <div
            className="flex flex-col gap-6 rounded-[20px] border border-border bg-background px-5 py-14"
            key={i}
          >
            <span className="text-[38px] leading-none font-bold text-muted-foreground">
              {stat.value}
            </span>
            <span className="text-lg text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

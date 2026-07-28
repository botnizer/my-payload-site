import React from 'react'

import type { PillCategoriesBlock as PillCategoriesBlockProps } from '@/payload-types'

/**
 * Each pill is the brand hue at 10% opacity, outlined and labelled in a
 * lightened tint of the same hue — as specified in the design.
 */
const toneClasses: Record<string, string> = {
  green: 'bg-brand-green/10 border-[#9af290] text-[#9af290]',
  blue: 'bg-brand-blue/10 border-[#809ffc] text-[#809ffc]',
  purple: 'bg-brand-purple/10 border-[#b981ff] text-[#b981ff]',
  orange: 'bg-brand-orange/10 border-[#ffb772] text-[#ffb772]',
}

export const PillCategoriesBlock: React.FC<PillCategoriesBlockProps & { id?: string }> = (props) => {
  const { heading, intro, pills } = props

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-12 rounded-[20px] bg-[radial-gradient(120%_200%_at_50%_-38%,#484848_0%,#2d2d2d_41%,#1f1f1f_61%,#111111_82%)] px-6 py-10 text-white">
        <div className="flex flex-col items-center gap-2.5 text-center">
          {heading && <h2 className="text-4xl font-semibold tracking-tight">{heading}</h2>}
          {intro && <p className="max-w-2xl text-lg font-light">{intro}</p>}
        </div>

        {pills && pills.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-5">
            {pills.map((pill, i) => (
              <li
                className={`rounded-[10px] border px-5 py-2.5 text-lg ${toneClasses[pill.tone] || toneClasses.green}`}
                key={i}
              >
                {pill.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

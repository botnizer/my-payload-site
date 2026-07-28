import React from 'react'

import type { ContactSplitBlock as ContactSplitBlockProps } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { FormBlock } from '@/blocks/Form/Component'

export const ContactSplitBlock: React.FC<ContactSplitBlockProps & { id?: string }> = (props) => {
  const { form, heading, intro, panelTitle, steps } = props

  // Only a populated form document can be rendered; a bare ID cannot.
  if (!form || typeof form !== 'object') return null

  return (
    <div className="bg-brand-ink py-20 text-white" data-theme="dark">
      <div className="container">
        {(heading || intro) && (
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            {heading && <h2 className="text-4xl font-bold tracking-tight">{heading}</h2>}
            {intro && <p className="max-w-2xl text-lg font-light">{intro}</p>}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl bg-background p-6 text-foreground md:p-8">
            {/* The plugin's Form type declares a string id, while the Postgres
                adapter generates numeric ids — the same divergence RenderBlocks
                suppresses when it renders the stock form block. */}
            <FormBlock enableIntro={false} form={form as unknown as FormType} />
          </div>

          {steps && steps.length > 0 && (
            <div className="rounded-2xl bg-[linear-gradient(160deg,#0a6500_0%,#063d00_100%)] p-8">
              {panelTitle && <h3 className="mb-6 text-xl font-semibold">{panelTitle}</h3>}
              <ol className="flex flex-col gap-5">
                {steps.map((step, i) => (
                  <li className="flex gap-3" key={i}>
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                    />
                    <span>
                      <span className="block font-medium">{step.title}</span>
                      {step.description && (
                        <span className="block text-sm text-white/70">{step.description}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

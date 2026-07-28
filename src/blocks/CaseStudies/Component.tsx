import type { CaseStudy, CaseStudiesBlock as CaseStudiesBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CaseStudyCard } from '@/components/CaseStudyCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const CaseStudiesBlock: React.FC<CaseStudiesBlockProps & { id?: string }> = async (
  props,
) => {
  const { heading, intro, limit: limitFromProps, link, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let caseStudies: CaseStudy[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetched = await payload.find({
      collection: 'case-studies',
      depth: 1,
      limit,
      sort: '-publishedAt',
    })

    caseStudies = fetched.docs
  } else if (selectedDocs?.length) {
    caseStudies = selectedDocs.filter(
      (doc): doc is CaseStudy => typeof doc === 'object',
    )
  }

  if (!caseStudies.length) return null

  return (
    <div className="container">
      {(heading || intro) && (
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          {heading && <h2 className="text-4xl font-bold tracking-tight">{heading}</h2>}
          {intro && <p className="max-w-2xl text-muted-foreground">{intro}</p>}
        </div>
      )}

      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <li key={caseStudy.id}>
            <CaseStudyCard doc={caseStudy} />
          </li>
        ))}
      </ul>

      {link?.label && (
        <div className="mt-12 flex justify-center">
          <Button asChild size="pill" variant="outline">
            <Link href={link.url || '/case-studies'}>{link.label}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

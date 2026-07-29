import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CaseStudyCard } from '@/components/CaseStudyCard'
import { buildSafeQuery, emptyPaginatedDocs } from '@/utilities/buildSafeQuery'
import type { CaseStudy } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function CaseStudiesPage() {
  const caseStudies = await buildSafeQuery(emptyPaginatedDocs<CaseStudy>(), async () =>
    (await getPayload({ config: configPromise })).find({
      collection: 'case-studies',
      depth: 1,
      limit: 24,
      overrideAccess: false,
      sort: '-publishedAt',
    }),
  )

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Case Studies</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          How restaurant brands use Botnizer to lift throughput, accuracy and guest experience.
        </p>
      </div>

      <div className="container">
        {caseStudies.docs.length ? (
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.docs.map((doc) => (
              <li key={doc.id}>
                <CaseStudyCard doc={doc} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No case studies published yet.</p>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Case Studies | Botnizer',
    description: 'Customer stories from restaurant brands using the Botnizer platform.',
  }
}

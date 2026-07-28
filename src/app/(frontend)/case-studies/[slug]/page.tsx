import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { CaseStudyCard } from '@/components/CaseStudyCard'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import { StarIcon } from 'lucide-react'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return caseStudies.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/case-studies/' + decodedSlug
  const doc = await queryCaseStudyBySlug({ slug: decodedSlug })

  if (!doc) return <PayloadRedirects url={url} />

  const testimonial = doc.testimonial
  const related = (doc.relatedCaseStudies || []).filter((item) => typeof item === 'object')

  return (
    <article className="pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <header className="relative -mt-[85px] flex min-h-[60vh] items-end text-white">
        {doc.heroImage && typeof doc.heroImage === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={doc.heroImage} />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 container pt-[85px] pb-16">
          {doc.client && <p className="mb-3 text-brand-green">{doc.client}</p>}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">{doc.title}</h1>
          {doc.publishedAt && (
            <time className="mt-4 block text-sm text-white/70" dateTime={doc.publishedAt}>
              {new Date(doc.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </header>

      <div className="container mt-16 flex flex-col gap-12">
        {doc.overview && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <RichText className="ms-0 max-w-3xl" data={doc.overview} enableGutter={false} />
          </section>
        )}

        {doc.objectives && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">Objectives</h2>
            <RichText className="ms-0 max-w-3xl" data={doc.objectives} enableGutter={false} />
          </section>
        )}

        {doc.solutions && (
          <section>
            <h2 className="mb-4 text-2xl font-bold">Solutions</h2>
            <RichText className="ms-0 max-w-3xl" data={doc.solutions} enableGutter={false} />
          </section>
        )}

        {doc.gallery && doc.gallery.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doc.gallery.map((item, i) => (
              <li className={i === 0 ? 'sm:col-span-2' : undefined} key={i}>
                {typeof item.image === 'object' && (
                  <Media
                    className="overflow-hidden rounded-xl"
                    imgClassName="aspect-[16/9] w-full object-cover"
                    resource={item.image}
                  />
                )}
              </li>
            ))}
          </ul>
        )}

        {doc.metrics && doc.metrics.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold">Results</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doc.metrics.map((metric, i) => (
                <li
                  className="flex flex-col gap-3 rounded-[20px] border border-border bg-background px-5 py-10"
                  key={i}
                >
                  <span className="text-[38px] leading-none font-bold text-muted-foreground">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {testimonial?.quote && (
          <figure className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 text-center">
            {typeof testimonial.rating === 'number' && testimonial.rating > 0 && (
              <div aria-label={`${testimonial.rating} out of 5`} className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    className={
                      i < (testimonial.rating || 0)
                        ? 'h-4 w-4 fill-brand-orange text-brand-orange'
                        : 'h-4 w-4 text-border'
                    }
                    key={i}
                  />
                ))}
              </div>
            )}
            <blockquote className="text-xl leading-relaxed">“{testimonial.quote}”</blockquote>
            <figcaption className="flex items-center gap-3">
              {testimonial.avatar && typeof testimonial.avatar === 'object' && (
                <Media
                  htmlElement={null}
                  imgClassName="h-12 w-12 rounded-full object-cover"
                  resource={testimonial.avatar}
                />
              )}
              <div className="text-left">
                {testimonial.name && <div className="font-semibold">{testimonial.name}</div>}
                {testimonial.role && (
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                )}
              </div>
            </figcaption>
          </figure>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold">Related stories</h2>
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <CaseStudyCard doc={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const doc = await queryCaseStudyBySlug({ slug: decodeURIComponent(slug) })

  return generateMeta({ doc })
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

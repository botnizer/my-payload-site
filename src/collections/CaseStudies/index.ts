import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateCaseStudy, revalidateDelete } from './hooks/revalidateCaseStudy'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

const summaryEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

/**
 * Customer stories. Feeds both the case study index and the detail page, and the
 * "Success Stories" card grid that repeats across most other pages — the card
 * reads challenge/solutionSummary/resultsSummary, the detail page the rest.
 */
export const CaseStudies: CollectionConfig<'case-studies'> = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    heroImage: true,
    client: true,
    solutionSummary: true,
    resultsSummary: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'client', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'case-studies',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'case-studies',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The challenge headline, e.g. "Managing complex customizations during lunch rush".',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          description: 'Shown in the Success Stories grid and the case study index.',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'solutionSummary',
              type: 'textarea',
              label: 'Solution',
              admin: {
                description: 'One line, e.g. "Botnizer Smart Modifiers & Station Routing".',
              },
            },
            {
              name: 'resultsSummary',
              type: 'textarea',
              label: 'Results',
              admin: {
                description: 'One line, e.g. "40% faster build times, 95% order accuracy".',
              },
            },
          ],
        },
        {
          label: 'Detail',
          fields: [
            {
              name: 'overview',
              type: 'richText',
              editor: summaryEditor,
            },
            {
              name: 'objectives',
              type: 'richText',
              editor: summaryEditor,
            },
            {
              name: 'solutions',
              type: 'richText',
              editor: summaryEditor,
            },
            {
              name: 'metrics',
              type: 'array',
              admin: {
                description: 'The headline numbers, e.g. "+34%" / "Increase in peak hour throughput".',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
              maxRows: 8,
            },
            {
              name: 'gallery',
              type: 'array',
              admin: {
                description: 'Photo collage shown partway down the detail page.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              maxRows: 8,
            },
            {
              name: 'testimonial',
              type: 'group',
              admin: {
                description: 'Hidden on the site when the quote is empty.',
              },
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                },
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'rating',
                  type: 'number',
                  min: 1,
                  max: 5,
                },
              ],
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedCaseStudies',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'case-studies',
            },
            {
              name: 'relatedSolutions',
              type: 'relationship',
              admin: {
                position: 'sidebar',
                description: 'Which products this story showcases.',
              },
              hasMany: true,
              relationTo: 'solutions',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'client',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'e.g. McDonald\'s',
      },
    },
    {
      name: 'clientLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateCaseStudy],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

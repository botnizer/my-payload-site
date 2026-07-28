import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Falls back to the bundled logo when left empty.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: "Let's Connect Today",
    },
    {
      name: 'tagline',
      type: 'textarea',
      admin: {
        description: 'Short paragraph shown beside the heading.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 8,
        },
      ],
      maxRows: 4,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaCard',
      type: 'group',
      label: 'CTA card',
      admin: {
        description: "The 'Let's Get Started' card. Hidden on the site when the title is empty.",
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        linkGroup({
          appearances: false,
          overrides: {
            maxRows: 1,
          },
        }),
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X', value: 'x' },
            { label: 'YouTube', value: 'youtube' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'copyright',
      type: 'text',
      admin: {
        description: 'Example: ©2025 Botnizer. All rights reserved.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

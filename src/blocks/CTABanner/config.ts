import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

/**
 * The dark "Ready to Transform Your Restaurant Technology Stack?" banner that
 * closes almost every page in the design.
 */
export const CTABanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CTABannerBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional artwork bleeding off the right edge of the banner.',
      },
    },
  ],
  labels: {
    plural: 'CTA Banners',
    singular: 'CTA Banner',
  },
}

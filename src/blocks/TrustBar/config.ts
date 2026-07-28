import type { Block } from 'payload'

/**
 * "Trusted by / 100+ Businesses" plus the bordered grid of customer logos.
 */
export const TrustBar: Block = {
  slug: 'trustBar',
  interfaceName: 'TrustBarBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Trusted by',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Used as the image alt text when the upload has none.',
          },
        },
      ],
      maxRows: 24,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  labels: {
    plural: 'Trust Bars',
    singular: 'Trust Bar',
  },
}

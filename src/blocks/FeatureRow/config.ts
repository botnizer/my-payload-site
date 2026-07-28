import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

/**
 * Alternating image/text product rows — the repeated section on the Digital
 * Signage and Drive-Thru pages ("High-Brightness Displays", "Integrated Audio
 * Systems", "Smart Media Players").
 */
export const FeatureRow: Block = {
  slug: 'featureRow',
  interfaceName: 'FeatureRowBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'bullets',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 8,
      admin: {
        description: 'Shown as small outlined tags beneath the copy.',
        initCollapsed: true,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      admin: {
        description: 'Alternate this down the page, as in the design.',
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 1,
      },
    }),
  ],
  labels: {
    plural: 'Feature Rows',
    singular: 'Feature Row',
  },
}

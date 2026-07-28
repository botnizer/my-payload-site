import type { Block } from 'payload'

/**
 * The metric cards that appear on the home, solutions, signage, drive-thru,
 * case study, about and contact pages — e.g. "+34% / Increase in peak hour
 * throughput".
 */
export const StatsRow: Block = {
  slug: 'statsRow',
  interfaceName: 'StatsRowBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The number itself, e.g. "+34%".',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'What it measures, e.g. "Increase in peak hour throughput".',
          },
        },
      ],
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  labels: {
    plural: 'Stats Rows',
    singular: 'Stats Row',
  },
}

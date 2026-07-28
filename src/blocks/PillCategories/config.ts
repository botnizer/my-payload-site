import type { Block } from 'payload'

/**
 * The dark "Solution Categories" band with tinted pills.
 */
export const PillCategories: Block = {
  slug: 'pillCategories',
  interfaceName: 'PillCategoriesBlock',
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
      name: 'pills',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'tone',
          type: 'select',
          defaultValue: 'green',
          options: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
            { label: 'Purple', value: 'purple' },
            { label: 'Orange', value: 'orange' },
          ],
          required: true,
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  labels: {
    plural: 'Pill Category Bands',
    singular: 'Pill Category Band',
  },
}

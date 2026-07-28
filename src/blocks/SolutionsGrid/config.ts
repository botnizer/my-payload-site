import type { Block } from 'payload'

/**
 * "A Unified Platform for Every Guest Touchpoint" — the product card grid.
 * Cards reference the solutions collection so the copy lives in one place.
 */
export const SolutionsGrid: Block = {
  slug: 'solutionsGrid',
  interfaceName: 'SolutionsGridBlock',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our offerings',
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'solutions',
      type: 'relationship',
      hasMany: true,
      relationTo: 'solutions',
      required: true,
      admin: {
        description: 'Order here controls the order on the page.',
      },
    },
  ],
  labels: {
    plural: 'Solutions Grids',
    singular: 'Solutions Grid',
  },
}

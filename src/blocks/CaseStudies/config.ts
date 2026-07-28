import type { Block } from 'payload'

/**
 * The "Success Stories" card grid. Follows the Archive block's populateBy
 * pattern: pull the most recent stories automatically, or hand-pick them.
 */
export const CaseStudiesBlock: Block = {
  slug: 'caseStudies',
  interfaceName: 'CaseStudiesBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Success Stories',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 3,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: 'case-studies',
    },
    {
      name: 'link',
      type: 'group',
      label: 'Footer link',
      admin: {
        description: 'The "See More" link below the grid. Hidden when the label is empty.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/case-studies',
        },
      ],
    },
  ],
  labels: {
    plural: 'Case Study Grids',
    singular: 'Case Study Grid',
  },
}

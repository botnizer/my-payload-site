import type { Block } from 'payload'

/**
 * The dark contact section: a form on the left and the green "What happens
 * next?" timeline panel on the right. Appears on the solutions, drive-thru,
 * signage and contact pages.
 *
 * The form itself is a form-builder document, so field definitions, validation
 * and submissions all stay with the plugin rather than being reimplemented.
 */
export const ContactSplit: Block = {
  slug: 'contactSplit',
  interfaceName: 'ContactSplitBlock',
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
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'panelTitle',
      type: 'text',
      defaultValue: 'What happens next?',
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Immediate confirmation".',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'e.g. "with calendar invite".',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  labels: {
    plural: 'Contact Sections',
    singular: 'Contact Section',
  },
}

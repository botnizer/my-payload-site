import type { Block } from 'payload'

/**
 * The "Pictures Collage" strip on the case study pages.
 */
export const MediaCollage: Block = {
  slug: 'mediaCollage',
  interfaceName: 'MediaCollageBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 8,
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  labels: {
    plural: 'Media Collages',
    singular: 'Media Collage',
  },
}

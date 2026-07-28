import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

/**
 * The rotating hero used by home variant B. Lives as a block rather than a hero
 * type so it can sit at the top of a page layout alongside everything else.
 */
export const HeroSlider: Block = {
  slug: 'heroSlider',
  interfaceName: 'HeroSliderBlock',
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        linkGroup({
          appearances: false,
          overrides: {
            maxRows: 1,
          },
        }),
      ],
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'autoplaySeconds',
      type: 'number',
      defaultValue: 6,
      min: 0,
      admin: {
        description: 'Seconds between slides. Set to 0 to disable autoplay.',
      },
    },
  ],
  labels: {
    plural: 'Hero Sliders',
    singular: 'Hero Slider',
  },
}

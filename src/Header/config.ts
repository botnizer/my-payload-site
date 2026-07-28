import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Falls back to the bundled logo when left empty.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'enableDropdown',
          type: 'checkbox',
          label: 'Show a dropdown under this item',
        },
        {
          name: 'dropdownItems',
          type: 'array',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.enableDropdown),
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
            {
              name: 'description',
              type: 'text',
              admin: {
                description: 'Optional supporting line shown beneath the label.',
              },
            },
          ],
          maxRows: 8,
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

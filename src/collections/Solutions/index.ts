import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { linkGroup } from '../../fields/linkGroup'
import { revalidateDelete, revalidateSolution } from './hooks/revalidateSolution'

import { slugField } from 'payload'

/**
 * The six products that recur across the design as a card grid — Digital Signage,
 * Self-Ordering Kiosk, Drive Thru Timer, NFC Google Review Cards, Digital Menu Board
 * and Drive Thru Audio System. They appear on the home, solutions and footer layouts,
 * so the copy lives here once and is referenced rather than duplicated per page.
 *
 * Solutions have no detail route: the in-depth pages (Digital Signage, Drive-Thru)
 * are authored as Pages, and `link` points at them.
 */
export const Solutions: CollectionConfig<'solutions'> = {
  slug: 'solutions',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    shortDescription: true,
    image: true,
    links: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description: 'The blurb shown on the card in the offerings grid.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Product shot used on the card.',
      },
    },
    // An array capped at one row, so a solution without a destination still saves —
    // a plain link group would make its inner url/reference fields required.
    linkGroup({
      appearances: false,
      overrides: {
        admin: {
          description: 'Where the card links to — usually the product page. Optional.',
        },
        maxRows: 1,
      },
    }),
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateSolution],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}

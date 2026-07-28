import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CaseStudiesBlock } from '@/blocks/CaseStudies/Component'
import { ContactSplitBlock } from '@/blocks/ContactSplit/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CTABannerBlock } from '@/blocks/CTABanner/Component'
import { FeatureRowBlock } from '@/blocks/FeatureRow/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroSliderBlock } from '@/blocks/HeroSlider/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaCollageBlock } from '@/blocks/MediaCollage/Component'
import { PillCategoriesBlock } from '@/blocks/PillCategories/Component'
import { SolutionsGridBlock } from '@/blocks/SolutionsGrid/Component'
import { StatsRowBlock } from '@/blocks/StatsRow/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'
import { TrustBarBlock } from '@/blocks/TrustBar/Component'

const blockComponents = {
  archive: ArchiveBlock,
  caseStudies: CaseStudiesBlock,
  contactSplit: ContactSplitBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaBanner: CTABannerBlock,
  featureRow: FeatureRowBlock,
  formBlock: FormBlock,
  heroSlider: HeroSliderBlock,
  mediaBlock: MediaBlock,
  mediaCollage: MediaCollageBlock,
  pillCategories: PillCategoriesBlock,
  solutionsGrid: SolutionsGridBlock,
  statsRow: StatsRowBlock,
  testimonial: TestimonialBlock,
  trustBar: TrustBarBlock,
}

/**
 * Blocks that bleed to the viewport edge or sit flush against the header supply
 * their own vertical rhythm, so the default spacing wrapper is skipped.
 */
const selfSpacingBlocks = new Set(['contactSplit', 'heroSlider'])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={selfSpacingBlocks.has(blockType) ? undefined : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

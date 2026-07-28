import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CaseStudiesBlock } from '@/blocks/CaseStudies/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CTABannerBlock } from '@/blocks/CTABanner/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SolutionsGridBlock } from '@/blocks/SolutionsGrid/Component'
import { StatsRowBlock } from '@/blocks/StatsRow/Component'
import { TrustBarBlock } from '@/blocks/TrustBar/Component'

const blockComponents = {
  archive: ArchiveBlock,
  caseStudies: CaseStudiesBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaBanner: CTABannerBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  solutionsGrid: SolutionsGridBlock,
  statsRow: StatsRowBlock,
  trustBar: TrustBarBlock,
}

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
                <div className="my-16" key={index}>
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

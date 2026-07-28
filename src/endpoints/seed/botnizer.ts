import type { Payload, PayloadRequest } from 'payload'

/**
 * Builds the Botnizer site structure from the Figma design: the six solutions,
 * three case studies, and every page including both home variants.
 *
 * Imagery is intentionally not included — the design's photography, diagrams and
 * partner logos have to be exported from Figma and uploaded to the Media
 * library. Pass a media id as `imageId` to attach a placeholder everywhere an
 * image belongs, so the layouts can be reviewed before the real assets land.
 */

type SeedArgs = {
  payload: Payload
  req?: PayloadRequest
  imageId?: number | null
  /**
   * Revalidation hooks call `revalidatePath`/`revalidateTag`, which throw
   * outside a Next.js request context. Leave this true when seeding from a CLI
   * script — but note that Next's cache then keeps serving the pre-seed globals,
   * so the dev server has to be restarted (or `.next` removed) to see them.
   * Pass false when seeding from a route handler, where revalidation works.
   */
  disableRevalidate?: boolean
}

const richText = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text, version: 1 }],
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const SOLUTIONS = [
  {
    title: 'Digital Signage',
    slug: 'digital-signage',
    shortDescription:
      'AI-powered outdoor digital menu boards delivering dynamic content, real-time updates and weather-responsive promotions.',
  },
  {
    title: 'Self-Ordering Kiosk',
    slug: 'self-ordering-kiosk',
    shortDescription:
      'Self-ordering kiosks that reduce queues, increase average order value and improve accuracy.',
  },
  {
    title: 'Drive Thru Timer',
    slug: 'drive-thru-timer',
    shortDescription:
      'Real-time drive-thru analytics that track traffic flow and identify bottlenecks by daypart.',
  },
  {
    title: 'NFC Google Review Cards',
    slug: 'nfc-google-review-cards',
    shortDescription:
      'NFC and QR cards that turn satisfied guests into Google reviews and boost local visibility.',
  },
  {
    title: 'Digital Menu Board',
    slug: 'digital-menu-board',
    shortDescription:
      'Dynamic indoor menu boards that update pricing and promotions across every location at once.',
  },
  {
    title: 'Drive Thru Audio System',
    slug: 'drive-thru-audio-system',
    shortDescription:
      'High-quality audio delivering clear two-way communication in noisy outdoor environments.',
  },
]

const CASE_STUDIES = [
  {
    title: 'Managing complex customizations during lunch rush',
    slug: 'managing-complex-customizations',
    client: 'Quick Serve Group',
    solutionSummary: 'Botnizer Smart Modifiers & Station Routing',
    resultsSummary: '40% faster build times, 95% order accuracy',
    metrics: [
      { value: '40%', label: 'Faster build times' },
      { value: '95%', label: 'Order accuracy' },
      { value: '-18s', label: 'Average ticket time' },
    ],
  },
  {
    title: 'Inconsistent quality across food trucks and brick-and-mortar',
    slug: 'inconsistent-quality-across-locations',
    client: 'Street Eats Co.',
    solutionSummary: 'Unified cloud-based platform for all locations',
    resultsSummary: 'Standardised processes, 30% faster service',
    metrics: [
      { value: '30%', label: 'Faster service' },
      { value: '12', label: 'Locations unified' },
    ],
  },
  {
    title: 'Delivery timing and driver coordination',
    slug: 'delivery-timing-and-driver-coordination',
    client: 'Metro Kitchen',
    solutionSummary: 'Integrated delivery dispatch with kitchen coordination',
    resultsSummary: '25% faster delivery, 18% more deliveries per shift',
    metrics: [
      { value: '25%', label: 'Faster delivery' },
      { value: '18%', label: 'More deliveries per shift' },
    ],
  },
]

export const seedBotnizer = async ({
  disableRevalidate = true,
  imageId = null,
  payload,
}: SeedArgs): Promise<void> => {
  const image = imageId ?? undefined
  const ctx = { disableRevalidate }

  payload.logger.info('— Seeding solutions...')
  const solutionIds: number[] = []
  for (const solution of SOLUTIONS) {
    const doc = await payload.create({
      collection: 'solutions',
      context: ctx,
      data: { ...solution, image, _status: 'published' },
    })
    solutionIds.push(doc.id)
  }

  payload.logger.info('— Seeding case studies...')
  for (const caseStudy of CASE_STUDIES) {
    await payload.create({
      collection: 'case-studies',
      context: ctx,
      data: {
        ...caseStudy,
        heroImage: image,
        publishedAt: new Date().toISOString(),
        overview: richText(
          `${caseStudy.client} needed to keep service times down without sacrificing accuracy as order complexity grew.`,
        ),
        objectives: richText(
          'Reduce ticket times at peak, raise order accuracy, and give managers visibility into where time is lost.',
        ),
        solutions: richText(caseStudy.solutionSummary),
        _status: 'published',
      },
    })
  }

  // Sections reused across several pages, matching the design's repetition.
  const trustBar = {
    blockType: 'trustBar' as const,
    eyebrow: 'Trusted by',
    heading: '100+ Businesses',
    logos: image ? Array.from({ length: 12 }, () => ({ logo: image })) : [],
  }

  const solutionsGrid = {
    blockType: 'solutionsGrid' as const,
    eyebrow: 'Our offerings',
    heading: 'A Unified Platform for Every Guest Touchpoint',
    solutions: solutionIds,
  }

  const successStories = {
    blockType: 'caseStudies' as const,
    heading: 'Success Stories',
    populateBy: 'collection' as const,
    limit: 3,
    link: { label: 'See More', url: '/case-studies' },
  }

  const ctaBanner = {
    blockType: 'ctaBanner' as const,
    title: 'Ready to Transform Your Restaurant Technology Stack?',
    description:
      'Schedule a personalized 30-minute consultation with our solutions team. See how the Botnizer platform integrates with your ecosystem to drive revenue and operational efficiency.',
    links: [{ link: { type: 'custom' as const, label: 'Request a Demo', url: '/contact' } }],
    image,
  }

  const solutionCategories = {
    blockType: 'pillCategories' as const,
    heading: 'Solution Categories',
    intro: 'Each solution is optimized for specific business outcomes',
    pills: [
      { label: 'Revenue Driver', tone: 'green' as const },
      { label: 'Efficiency Focus', tone: 'blue' as const },
      { label: 'Guest Experience', tone: 'purple' as const },
      { label: 'Operations', tone: 'orange' as const },
    ],
  }

  const pages: Array<Record<string, unknown>> = [
    {
      title: 'Home',
      slug: 'home',
      hero: {
        type: 'highImpact',
        richText: richText('Restaurant Technology — Designed for Leading Brands'),
        links: [{ link: { type: 'custom', label: 'Request a Demo', url: '/contact' } }],
        media: image,
      },
      layout: [
        trustBar,
        solutionsGrid,
        {
          blockType: 'statsRow',
          heading: 'Measurable Results for Full Service and Fast Casual Restaurants',
          intro: 'Deployed across leading QSR brands worldwide.',
          stats: [
            { value: '+34%', label: 'Increase in peak hour throughput' },
            { value: '-22%', label: 'Reduction in order errors' },
            { value: '-48s', label: 'Shaved off average drive-thru time' },
          ],
        },
        successStories,
        ctaBanner,
      ],
    },
    {
      // Variant B: slider hero, no vision/map/illustration sections, contact
      // form pulled onto the homepage. Kept alongside variant A for comparison.
      title: 'Home (variant B)',
      slug: 'home-b',
      hero: { type: 'none' },
      layout: [
        {
          blockType: 'heroSlider',
          autoplaySeconds: 6,
          slides: image
            ? [
                {
                  eyebrow: 'Botnizer',
                  heading: 'Restaurant Technology Designed for Leading Brands',
                  description:
                    'An API-first platform that unifies digital signage, self-ordering kiosks, drive-thru systems and checkout.',
                  image,
                  links: [{ link: { type: 'custom', label: 'Request a Demo', url: '/contact' } }],
                },
                {
                  eyebrow: 'Drive-Thru',
                  heading: 'Shave seconds off every order',
                  description: 'Real-time analytics that show exactly where time is lost.',
                  image,
                  links: [{ link: { type: 'custom', label: 'See the platform', url: '/solutions' } }],
                },
              ]
            : [],
        },
        trustBar,
        solutionsGrid,
        {
          blockType: 'statsRow',
          heading: 'Measurable Results for Full Service and Fast Casual Restaurants',
          stats: [
            { value: '22%', label: 'Average increase in order value with integrated upselling' },
            { value: '40%', label: 'Reduction in service time during peak hours' },
            { value: '360°', label: 'Unified view of guest lifetime value and preferences' },
          ],
        },
        successStories,
        ctaBanner,
      ],
    },
    {
      title: 'Solutions',
      slug: 'solutions',
      hero: {
        type: 'mediumImpact',
        richText: richText('Solutions built for every guest touchpoint'),
        media: image,
      },
      layout: [
        solutionsGrid,
        solutionCategories,
        {
          blockType: 'statsRow',
          heading: 'Platform Advantage',
          stats: [
            { value: '99.9%', label: 'Platform uptime' },
            { value: '<2h', label: 'Average support response' },
            { value: '150+', label: 'Successful deployments' },
          ],
        },
        successStories,
        ctaBanner,
      ],
    },
    {
      title: 'Digital Signage',
      slug: 'digital-signage',
      hero: {
        type: 'mediumImpact',
        richText: richText('Digital Signage that adapts in real time'),
        media: image,
      },
      layout: [
        {
          blockType: 'featureRow',
          heading: 'High-Brightness Displays',
          description:
            'Outdoor-rated displays engineered for direct sunlight, wind and rain, with automatic brightness matching.',
          bullets: [{ label: '2500 nits' }, { label: 'IP65 rated' }, { label: '24/7 operation' }],
          image,
          mediaPosition: 'right',
        },
        {
          blockType: 'featureRow',
          heading: 'Smart Media Players',
          description:
            'Purpose-built media players that keep content in sync across every screen and location.',
          bullets: [{ label: 'Remote updates' }, { label: 'Offline failover' }],
          image,
          mediaPosition: 'left',
        },
        {
          blockType: 'statsRow',
          heading: 'Proven Return on Investment',
          stats: [
            { value: '+18%', label: 'Lift in promoted item sales' },
            { value: '-30%', label: 'Reduction in print costs' },
          ],
        },
        successStories,
        ctaBanner,
      ],
    },
    {
      title: 'Drive-Thru',
      slug: 'drive-thru',
      hero: {
        type: 'mediumImpact',
        richText: richText('The drive-thru bottleneck, solved'),
        media: image,
      },
      layout: [
        {
          blockType: 'statsRow',
          heading: 'The Drive-Thru Bottleneck Problem',
          intro:
            'Slow drive-thru service costs QSR brands millions in lost revenue and customer loyalty annually.',
          stats: [
            { value: '80%', label: 'Of customers prefer the drive-thru' },
            { value: '8.2mo', label: 'Average payback period' },
            { value: '65%', label: 'Of revenue from the drive-thru lane' },
          ],
        },
        {
          blockType: 'featureRow',
          heading: 'Drive-Thru High Brightness Display',
          description: 'Menu boards readable in full sun, with dayparted content that changes itself.',
          bullets: [{ label: 'Sunlight readable' }, { label: 'Dayparting' }],
          image,
          mediaPosition: 'right',
        },
        {
          blockType: 'featureRow',
          heading: 'Integrated Audio System',
          description: 'Noise-cancelling two-way audio so orders are heard correctly the first time.',
          bullets: [{ label: 'Noise cancelling' }, { label: 'Digital clarity' }],
          image,
          mediaPosition: 'left',
        },
        successStories,
        ctaBanner,
      ],
    },
    {
      title: 'Case Studies',
      slug: 'case-studies-overview',
      hero: {
        type: 'mediumImpact',
        richText: richText('Results from real restaurant brands'),
        media: image,
      },
      layout: [
        { ...successStories, limit: 6, link: { label: '', url: '/case-studies' } },
        trustBar,
        ctaBanner,
      ],
    },
    {
      title: 'About us',
      slug: 'about',
      hero: {
        type: 'mediumImpact',
        richText: richText('Tech Meets QSR Excellence'),
        media: image,
      },
      layout: [
        {
          blockType: 'featureRow',
          heading: 'Built by operators, for operators',
          description:
            'Botnizer was founded by restaurant technologists who spent years watching good kitchens lose money to bad software.',
          image,
          mediaPosition: 'right',
        },
        {
          blockType: 'statsRow',
          heading: 'Our Impact',
          stats: [
            { value: '100+', label: 'Businesses served' },
            { value: '12', label: 'Countries' },
            { value: '150+', label: 'Deployments' },
            { value: '99.9%', label: 'Uptime' },
          ],
        },
        {
          blockType: 'testimonial',
          quote:
            'We built Botnizer because restaurant operators deserve technology that works as hard as they do.',
          name: 'Salman Asim',
          role: 'Founder & CEO',
          rating: 5,
          avatar: image,
        },
        trustBar,
        ctaBanner,
      ],
    },
    {
      title: 'Contact us',
      slug: 'contact',
      hero: {
        type: 'lowImpact',
        richText: richText('Partner with Botnizer'),
      },
      layout: [
        {
          blockType: 'statsRow',
          heading: 'Why Partners Choose Botnizer',
          stats: [
            { value: '22%', label: 'Average increase in order value' },
            { value: '40%', label: 'Reduction in service time at peak' },
            { value: '360°', label: 'Unified view of guest lifetime value' },
          ],
        },
        solutionCategories,
        successStories,
        ctaBanner,
      ],
    },
  ]

  payload.logger.info('— Seeding pages...')
  for (const page of pages) {
    await payload.create({
      collection: 'pages',
      context: ctx,
      // Block shapes are validated by Payload at runtime; the literal union
      // types here are wider than the generated per-block types.
      data: { ...page, _status: 'published' } as never,
    })
  }

  payload.logger.info('— Seeding globals...')
  await payload.updateGlobal({
    slug: 'header',
    context: ctx,
    data: {
      navItems: [
        {
          link: { type: 'custom', label: 'What we do', url: '/solutions' },
          enableDropdown: true,
          dropdownItems: SOLUTIONS.slice(0, 4).map((solution) => ({
            link: { type: 'custom', label: solution.title, url: '/solutions' },
          })),
        },
        { link: { type: 'custom', label: 'Solutions', url: '/solutions' } },
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Case Study', url: '/case-studies' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
      ],
    } as never,
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: ctx,
    data: {
      heading: "Let's Connect Today",
      tagline:
        'Talk to our team about unifying signage, kiosks, drive-thru and checkout on one platform.',
      columns: [
        {
          label: 'Experience',
          navItems: [{ link: { type: 'custom', label: 'Drive-Thru', url: '/drive-thru' } }],
        },
        {
          label: 'Products',
          navItems: SOLUTIONS.slice(0, 5).map((solution) => ({
            link: { type: 'custom', label: solution.title, url: '/solutions' },
          })),
        },
        {
          label: 'Company',
          navItems: [
            { link: { type: 'custom', label: 'About', url: '/about' } },
            { link: { type: 'custom', label: 'Solutions', url: '/solutions' } },
            { link: { type: 'custom', label: 'Case Study', url: '/case-studies' } },
          ],
        },
      ],
      ctaCard: {
        title: "Let's Get Started",
        description: "We're here to listen and assist.",
        links: [{ link: { type: 'custom', label: 'Contact us today', url: '/contact' } }],
      },
      copyright: `©${new Date().getFullYear()} Botnizer. All rights reserved.`,
    } as never,
  })

  payload.logger.info('Botnizer content seeded.')
}

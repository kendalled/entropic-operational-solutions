import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // One file per service area. Prices mirror the client service catalog
    // (U.S. SMB planning ranges, updated September 25, 2026).
    services: defineCollection({
      type: 'data',
      source: 'services/*.yml',
      schema: z.object({
        order: z.number(),
        slug: z.string(),
        name: z.string(),
        kind: z.enum(['advisory', 'technical']),
        icon: z.string(),
        summary: z.string(),
        description: z.string(),
        services: z.array(z.object({
          id: z.string(),
          name: z.string(),
          from: z.number(),
          to: z.number(),
          billing: z.enum(['Fixed', 'Monthly', 'Hourly']),
          scope: z.string(),
          fit: z.string(),
          drivers: z.string(),
          timing: z.string(),
        })),
      }),
    }),
    // Target markets. These describe who the services are designed for,
    // not completed engagements.
    industries: defineCollection({
      type: 'data',
      source: 'industries/*.yml',
      schema: z.object({
        order: z.number(),
        slug: z.string(),
        name: z.string(),
        summary: z.string(),
        needs: z.array(z.string()),
        goal: z.string(),
        services: z.array(z.string()),
        watchouts: z.string(),
        image: z.string(),
        imageDark: z.string(),
        imageAlt: z.string(),
      }),
    }),
  },
})

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import type { Service } from '~/composables/useCatalog'

const { data: areas } = await useServiceAreas()
const index = computed(() => indexServices(areas.value))

const featuredIds = ['SV01', 'SV03', 'SV04', 'SV06', 'SV09', 'SV13', 'SV20', 'SV31', 'SV41', 'SV26', 'SV27', 'SV52', 'SV45']
const featured = computed(() => featuredIds.map(id => index.value.get(id)).filter(entry => entry !== undefined))

const models = computed(() => {
  const all = areas.value.flatMap(area => area.services)
  const span = (billing: Service['billing']) => {
    const items = all.filter(service => service.billing === billing)
    return {
      count: items.length,
      from: Math.min(...items.map(service => service.from)),
      to: Math.max(...items.map(service => service.to)),
    }
  }
  return [
    {
      name: 'Fixed-scope projects',
      unit: 'per project',
      description: 'Most work is quoted as a fixed price against a written statement of work, with one agreed acceptance pass.',
      examples: ['Cash-flow and runway forecast', 'Core business website', 'Accounting–POS reconciliation link'],
      ...span('Fixed'),
    },
    {
      name: 'Monthly plans',
      unit: 'per month',
      description: 'Bookkeeping, monitoring, and support on a monthly agreement with defined coverage, included hours, and response windows.',
      examples: ['Monthly bookkeeping and owner reports', 'Essential website care', 'Fractional technology advisory'],
      ...span('Monthly'),
    },
    {
      name: 'Hourly work',
      unit: 'per hour',
      description: 'Enhancements to existing software, workshops, and scheduled troubleshooting, estimated before work starts.',
      examples: ['App feature development', 'Software enhancement and rescue', 'Ad hoc technical support'],
      ...span('Hourly'),
    },
  ]
})

const included = [
  'Deliverables defined in the written statement of work',
  'One agreed acceptance pass on fixed projects',
  'Documentation, training, or an owner walkthrough where specified',
  'Defined hours and response windows on monthly plans',
]

const separate = [
  'Third-party software subscriptions and hosting',
  'Payment processing fees and ad spend',
  'Content production and tax filings',
  'New features, additional systems, or major data cleanup (by change order)',
]

const faqs = [
  {
    question: 'Why ranges instead of fixed prices?',
    answer: 'Cost depends on requirements, existing systems, data quality, integrations, and delivery complexity. Each range reflects the included scope listed in the catalog. Your price is fixed in writing after discovery.',
  },
  {
    question: 'Do you offer packages?',
    answer: 'Not as bundles. The industry combinations are starting points for a conversation, and each service is quoted at its own scope so you only pay for what you need.',
  },
  {
    question: 'What happens if the scope changes mid-project?',
    answer: 'New features, additional systems, and major data cleanup are handled through a change order, so the price and timeline are agreed before the extra work begins.',
  },
  {
    question: 'Do unused monthly hours roll over?',
    answer: 'Not unless your agreement says so. Each monthly plan states its included hours and response windows up front.',
  },
  {
    question: 'Can an accessibility audit make my site compliant?',
    answer: 'Accessibility work targets criteria agreed at the start, usually from WCAG, using automated checks plus manual keyboard and screen-reader testing. An audit or fix package does not guarantee legal compliance.',
  },
  {
    question: 'Do you prepare taxes or run payroll?',
    answer: 'Tax preparation and filing, payroll administration, audits, legal services, and investment advice are not part of the current catalog. Bookkeeping can be organized so your CPA or payroll provider has what they need.',
  },
]

useSeoMeta({
  title: 'Pricing',
  description: 'Planning price ranges for fixed-scope projects, monthly plans, and hourly work, plus what is included and what is billed separately.',
})
</script>

<template>
  <div>
    <section class="pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          :level="1"
          eyebrow="Pricing"
          title="Clear ranges. Written scope. No surprises."
          description="Every service has a published planning range. After a discovery conversation, you receive a fixed quote and statement of work before anything starts."
        />

        <div class="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-3">
          <div
            v-for="(model, i) in models"
            :key="model.name"
            v-reveal="i * 100"
            class="flex flex-col justify-between gap-8 border-t border-stone-950/10 pt-8 dark:border-white/10"
          >
            <div>
              <h2 class="text-lg/7 font-semibold text-stone-950 dark:text-white">
                {{ model.name }}
              </h2>
              <p class="mt-4 font-display text-4xl text-stone-950 tabular-nums sm:text-5xl dark:text-white">
                {{ formatPrice(model.from) }}–{{ formatPrice(model.to) }}
              </p>
              <p class="mt-1 text-base/7 text-stone-500 sm:text-sm/6 dark:text-neutral-400">
                {{ model.unit }}, across {{ model.count }} services
              </p>
              <p class="mt-6 text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
                {{ model.description }}
              </p>
              <ul role="list" class="mt-6 grid gap-y-2">
                <li v-for="example in model.examples" :key="example" class="text-base/7 text-stone-950 sm:text-sm/6 dark:text-white">
                  {{ example }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="ranges-heading" class="bg-stone-50 py-24 sm:py-32 dark:bg-white/2.5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-col gap-x-8 gap-y-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            v-reveal
            eyebrow="Common engagements"
            description="A selection from the catalog. Ranges cover the scope described for each service on the services page."
          >
            <template #title>
              <span id="ranges-heading">Typical ranges at a glance.</span>
            </template>
          </SectionHeading>
          <ArrowLink to="/services" class="shrink-0">
            Full catalog
          </ArrowLink>
        </div>

        <div v-reveal class="mt-16 -mx-6 -my-2 overflow-x-auto whitespace-nowrap lg:-mx-8">
          <div class="inline-block min-w-full px-6 py-2 align-middle lg:px-8">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-stone-950/10 dark:border-white/10">
                  <th scope="col" class="py-3 pr-6 text-base/7 font-semibold whitespace-nowrap text-stone-950 sm:text-sm/6 dark:text-white">
                    Service
                  </th>
                  <th scope="col" class="px-6 py-3 text-base/7 font-semibold whitespace-nowrap text-stone-950 max-md:hidden sm:text-sm/6 dark:text-white">
                    Area
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-base/7 font-semibold whitespace-nowrap text-stone-950 sm:text-sm/6 dark:text-white">
                    Range
                  </th>
                  <th scope="col" class="py-3 pl-6 text-right text-base/7 font-semibold whitespace-nowrap text-stone-950 sm:text-sm/6 dark:text-white">
                    Billing
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-950/5 dark:divide-white/5">
                <tr v-for="{ service, area } in featured" :key="service.id">
                  <td class="py-4 pr-6 text-base/7 font-medium text-stone-950 sm:text-sm/6 dark:text-white">
                    {{ service.name }}
                  </td>
                  <td class="px-6 py-4 text-base/7 text-stone-600 max-md:hidden sm:text-sm/6 dark:text-neutral-400">
                    {{ area.name }}
                  </td>
                  <td class="px-6 py-4 text-right text-base/7 text-stone-950 tabular-nums sm:text-sm/6 dark:text-white">
                    {{ formatRange(service) }}
                  </td>
                  <td class="py-4 pl-6 text-right text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                    {{ service.billing }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p class="mt-8 text-base/7 text-stone-500 sm:text-sm/6 dark:text-neutral-400">
          Planning ranges in USD, last reviewed September 25, 2026.
        </p>
      </div>
    </section>

    <section aria-labelledby="included-heading" class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          v-reveal
          eyebrow="What a quote covers"
          description="The statement of work spells this out for every engagement."
        >
          <template #title>
            <span id="included-heading">Included, and billed separately.</span>
          </template>
        </SectionHeading>

        <div class="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-2">
          <div v-reveal class="border-t border-stone-950/10 pt-8 dark:border-white/10">
            <h3 class="text-lg/7 font-semibold text-stone-950 dark:text-white">
              Included in your quote
            </h3>
            <ul role="list" class="mt-6 grid gap-y-3">
              <li v-for="item in included" :key="item" class="flex gap-x-3 text-base/7 text-stone-600 dark:text-neutral-400">
                <span class="flex h-lh shrink-0 items-center" aria-hidden="true"><span class="size-1.5 rounded-full bg-brand-700 dark:bg-neutral-400" /></span>
                {{ item }}
              </li>
            </ul>
          </div>
          <div v-reveal="100" class="border-t border-stone-950/10 pt-8 dark:border-white/10">
            <h3 class="text-lg/7 font-semibold text-stone-950 dark:text-white">
              Billed separately unless listed
            </h3>
            <ul role="list" class="mt-6 grid gap-y-3">
              <li v-for="item in separate" :key="item" class="flex gap-x-3 text-base/7 text-stone-600 dark:text-neutral-400">
                <span class="flex h-lh shrink-0 items-center" aria-hidden="true"><span class="size-1.5 rounded-full bg-stone-400 dark:bg-neutral-600" /></span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="faq-heading" class="border-t border-stone-950/5 py-24 sm:py-32 dark:border-white/10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <SectionHeading v-reveal eyebrow="Questions" class="lg:col-span-4">
            <template #title>
              <span id="faq-heading">Pricing questions.</span>
            </template>
          </SectionHeading>
          <div class="divide-y divide-stone-950/10 border-y border-stone-950/10 lg:col-span-7 lg:col-start-6 dark:divide-white/10 dark:border-white/10">
            <details v-for="faq in faqs" :key="faq.question" class="group">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-x-6 py-6 text-lg/7 font-medium text-stone-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:text-white dark:focus-visible:outline-white [&::-webkit-details-marker]:hidden">
                {{ faq.question }}
                <ChevronDownIcon class="size-5 shrink-0 fill-stone-500 transition-transform duration-200 ease-(--ease-out-quart) group-open:rotate-180 motion-reduce:transition-none dark:fill-neutral-500" aria-hidden="true" />
              </summary>
              <p class="max-w-[56ch] pb-6 text-base/7 text-pretty text-stone-600 motion-safe:group-open:animate-[fade-in_200ms_var(--ease-out-quart)] dark:text-neutral-400">
                {{ faq.answer }}
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <CtaSection
      title="Ready for a real number?"
      description="Share what you need and we will come back with a recommended starting point. You review a fixed quote and written scope before any work begins."
    />
  </div>
</template>

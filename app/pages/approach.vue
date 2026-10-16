<script setup lang="ts">
const principles = [
  {
    title: 'Numbers before software',
    description: 'Cash flow, margins, and reporting come first, so every technology decision is grounded in what the business actually needs.',
  },
  {
    title: 'One partner from advice to build',
    description: 'The same engagement that finds the problem can scope and deliver the fix, so nothing is lost between the advisor and the developer.',
  },
  {
    title: 'Written scope, every time',
    description: 'Deliverables, exclusions, acceptance criteria, and price are agreed in a statement of work before any work begins.',
  },
  {
    title: 'Plain-language deliverables',
    description: 'Owner reports, walkthroughs, and documentation written for the people running the business, not for other consultants.',
  },
  {
    title: 'Buy before you build',
    description: 'If an existing tool fits, that is the recommendation. Custom software is reserved for needs off-the-shelf options cannot meet.',
  },
  {
    title: 'Handoff, not dependence',
    description: 'Training and documentation are part of the scope, so your team can run what was built. Ongoing support is optional.',
  },
]

// Illustrative combinations from the business plan; not case studies.
const examples = [
  { business: 'A kava bar', combination: 'Monthly financial reporting, a point-of-sale to accounting connection, and a new website.' },
  { business: 'A content creator', combination: 'A membership website, payment integration, and automated customer communications.' },
  { business: 'A nonprofit', combination: 'An accessible website and a dashboard for financial and operational reporting.' },
  { business: 'A tabletop retailer', combination: 'An ecommerce storefront, event registration, and connected sales records.' },
  { business: 'A startup', combination: 'Cash-flow planning, product discovery, a prototype, and a scoped MVP.' },
]

const outsideScope = [
  'Tax preparation and filing',
  'Payroll administration',
  'Audit and assurance',
  'Investment advice',
  'Legal services',
]

useSeoMeta({
  title: 'Approach',
  description: 'Financial and business advisory first, with technical implementation when it helps. How engagements are scoped, delivered, and handed off.',
})
</script>

<template>
  <div>
    <section class="pt-16 pb-16 sm:pt-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading :level="1" eyebrow="Approach">
          <template #title>
            Advisory first. <em>Implementation</em> when it helps.
          </template>
          <template #description>
            Most operational problems show up in the numbers before they show up anywhere else. We start there, then fix the processes and systems behind them.
          </template>
        </SectionHeading>
      </div>
    </section>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- PLACEHOLDER IMAGE: wide photograph of the working environment or a client conversation. About 21:9. -->
      <ThemedImage
        src="/images/placeholders/approach.webp"
        sizes="100vw lg:1216px"
        priority
        class="aspect-16/9 animate-rise rounded-[min(2.5vw,var(--radius-3xl))] [animation-delay:120ms] motion-reduce:animate-none sm:aspect-21/9"
      />
    </div>

    <section aria-labelledby="principles-heading" class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          v-reveal
          eyebrow="Principles"
          description="These shape every engagement, whether it is a pricing review or a member portal."
        >
          <template #title>
            <span id="principles-heading">How the work gets done.</span>
          </template>
        </SectionHeading>
        <dl class="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(principle, index) in principles"
            :key="principle.title"
            v-reveal="(index % 3) * 100"
            class="border-t border-stone-950/10 pt-6 dark:border-white/10"
          >
            <dt class="text-lg/7 font-semibold text-stone-950 dark:text-white">
              {{ principle.title }}
            </dt>
            <dd class="mt-2 text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
              {{ principle.description }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section aria-labelledby="examples-heading" class="bg-stone-50 py-24 sm:py-32 dark:bg-white/2.5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-x-8 gap-y-16 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <SectionHeading
              v-reveal
              eyebrow="How services combine"
              description="Engagements often pair advice with implementation. These illustrative examples show how the pieces fit."
            >
              <template #title>
                <span id="examples-heading">Advice and implementation, together.</span>
              </template>
            </SectionHeading>
            <!-- PLACEHOLDER IMAGE: detail shot, e.g. a point-of-sale counter or a laptop with reports. About 4:3. -->
            <ThemedImage
              v-reveal="100"
              src="/images/placeholders/industry-bars.webp"
              dark-src="/images/placeholders/industry-bars-dark.webp"
              sizes="100vw lg:520px"
              class="mt-12 aspect-4/3 rounded-[min(2.5vw,var(--radius-2xl))] max-lg:hidden"
            />
          </div>
          <dl class="divide-y divide-stone-950/10 self-start lg:col-span-6 lg:col-start-7 dark:divide-white/10">
            <div v-for="example in examples" :key="example.business" v-reveal class="grid gap-x-8 gap-y-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-3">
              <dt class="text-base/7 font-medium text-stone-950 dark:text-white">
                {{ example.business }}
              </dt>
              <dd class="text-base/7 text-pretty text-stone-600 sm:col-span-2 dark:text-neutral-400">
                {{ example.combination }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section aria-labelledby="process-heading" class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          v-reveal
          eyebrow="Engagement process"
          description="Four steps, the same for a one-time review or a long-running build."
        >
          <template #title>
            <span id="process-heading">From first call to handoff.</span>
          </template>
        </SectionHeading>
        <div class="mt-16">
          <ProcessSteps />
        </div>
      </div>
    </section>

    <section aria-labelledby="scope-heading" class="border-t border-stone-950/5 py-24 sm:py-32 dark:border-white/10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <SectionHeading
            v-reveal
            eyebrow="Scope boundaries"
            description="Some work sits outside the current catalog. Books and reports can be organized so your CPA, attorney, or payroll provider has what they need."
            class="lg:col-span-6"
          >
            <template #title>
              <span id="scope-heading">What we leave to specialists.</span>
            </template>
          </SectionHeading>
          <ul role="list" class="divide-y divide-stone-950/10 self-end lg:col-span-5 lg:col-start-8 dark:divide-white/10">
            <li v-for="item in outsideScope" :key="item" v-reveal class="py-4 text-lg/7 text-stone-950 first:pt-0 last:pb-0 dark:text-white">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

<script setup lang="ts">
const [{ data: areas }, { data: industries }] = await Promise.all([useServiceAreas(), useIndustries()])

const financial = computed(() => areas.value.find(area => area.kind === 'advisory'))
const technical = computed(() => areas.value.filter(area => area.kind === 'technical'))

useSeoMeta({
  title: 'Financial and business advisory for small and midsize businesses',
  ogTitle: 'Entropic Operational Solutions',
  description: 'Bookkeeping, cash-flow forecasting, and pricing advice for small and midsize businesses, with web, integration, automation, and software services when the fix involves technology.',
  ogDescription: 'Financial and business advisory first, supported by practical technical implementation.',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid items-center gap-x-8 gap-y-16 lg:grid-cols-12">
          <div class="lg:col-span-6">
            <p class="animate-rise text-base/7 font-semibold text-brand-700 motion-reduce:animate-none sm:text-sm/6 dark:text-neutral-400">
              Financial and business advisory for small and midsize businesses
            </p>
            <h1 class="mt-4 max-w-[20ch] animate-rise font-display text-6xl tracking-tight text-balance text-stone-950 [animation-delay:80ms] motion-reduce:animate-none sm:text-7xl lg:text-8xl dark:text-white">
              Clear numbers. <em class="text-brand-700 dark:text-white">Steady</em> operations.
            </h1>
            <p class="mt-8 max-w-[48ch] animate-rise text-lg/8 text-pretty text-stone-600 [animation-delay:160ms] motion-reduce:animate-none dark:text-neutral-400">
              We help owners understand cash flow, profitability, and pricing, then put the systems in place to act on it. When the fix involves software, we build that too.
            </p>
            <div class="mt-10 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:240ms] motion-reduce:animate-none">
              <UiButton to="/contact">
                Book a discovery call
              </UiButton>
              <ArrowLink to="/services">
                Explore services
              </ArrowLink>
            </div>
          </div>

          <div class="relative animate-rise [animation-delay:200ms] motion-reduce:animate-none lg:col-span-6">
            <!-- PLACEHOLDER IMAGE: hero photograph (e.g. an owner reviewing reports in their space). Portrait crop, about 4:5. -->
            <ThemedImage
              src="/images/placeholders/hero.webp"
              sizes="100vw lg:640px"
              priority
              class="aspect-4/5 rounded-[min(2.5vw,var(--radius-3xl))] sm:aspect-5/4 lg:aspect-square"
            />
            <!-- Illustrative sample report, not client data. -->
            <div class="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-5 shadow-xl ring-1 shadow-stone-950/10 ring-black/5 backdrop-blur-sm sm:inset-x-auto sm:bottom-8 sm:left-8 sm:w-80 dark:bg-neutral-900/95 dark:shadow-none dark:ring-white/10">
              <div class="flex items-center justify-between gap-x-4">
                <p class="text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
                  Owner report
                </p>
                <p class="rounded-full bg-stone-950/5 px-2 py-0.5 text-sm/6 text-stone-600 sm:text-xs/5 dark:bg-white/10 dark:text-neutral-400">
                  Sample
                </p>
              </div>
              <dl class="mt-4 divide-y divide-stone-950/5 dark:divide-white/10">
                <div class="flex items-baseline justify-between gap-x-4 pb-3">
                  <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                    Cash on hand
                  </dt>
                  <dd class="text-base/7 font-medium text-stone-950 tabular-nums sm:text-sm/6 dark:text-white">
                    $48,200
                  </dd>
                </div>
                <div class="flex items-baseline justify-between gap-x-4 py-3">
                  <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                    13-week low point
                  </dt>
                  <dd class="text-base/7 font-medium text-stone-950 tabular-nums sm:text-sm/6 dark:text-white">
                    Week 9
                  </dd>
                </div>
                <div class="flex items-baseline justify-between gap-x-4 pt-3">
                  <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                    Gross margin
                  </dt>
                  <dd class="text-base/7 font-medium text-stone-950 tabular-nums sm:text-sm/6 dark:text-white">
                    61.4%
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div class="mt-20 border-t border-stone-950/5 pt-10 sm:mt-24 dark:border-white/10">
          <LogoCloud />
        </div>
      </div>
    </section>

    <!-- Financial foundations -->
    <section v-if="financial" aria-labelledby="financial-heading" class="bg-stone-50 py-24 sm:py-32 dark:bg-white/2.5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-x-8 gap-y-16 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <div v-reveal>
              <SectionHeading eyebrow="Start with the numbers" :description="financial.description">
                <template #title>
                  <span id="financial-heading">Financial foundations come first.</span>
                </template>
              </SectionHeading>
              <div class="mt-8">
                <ArrowLink :to="{ path: '/services', hash: '#financial-foundations' }">
                  See scope and pricing
                </ArrowLink>
              </div>
            </div>
            <!-- PLACEHOLDER IMAGE: workspace or bookkeeping detail shot. Landscape, about 3:2. -->
            <ThemedImage
              v-reveal="100"
              src="/images/placeholders/financial.webp"
              sizes="100vw lg:520px"
              class="mt-12 aspect-3/2 rounded-[min(2.5vw,var(--radius-2xl))] max-lg:hidden"
            />
          </div>

          <dl class="grid gap-x-8 gap-y-12 self-start sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <div
              v-for="(service, index) in financial.services"
              :key="service.id"
              v-reveal="index * 80"
              class="flex flex-col border-t border-stone-950/10 pt-6 dark:border-white/10"
            >
              <dt class="text-lg/7 font-semibold text-stone-950 dark:text-white">
                {{ service.name }}
              </dt>
              <dd class="mt-2 flex flex-1 flex-col justify-between gap-6">
                <p class="text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
                  {{ service.scope }}
                </p>
                <p class="flex flex-wrap items-baseline gap-x-1.5 text-base/7 text-stone-950 tabular-nums sm:text-sm/6 dark:text-white">
                  <span class="font-semibold">{{ formatRange(service) }}</span>
                  <span class="text-stone-500 dark:text-neutral-400">{{ billingUnit(service.billing) }}</span>
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Technical services -->
    <section aria-labelledby="technical-heading" class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-x-8 gap-y-16 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <div class="lg:sticky lg:top-32">
              <SectionHeading
                v-reveal
                eyebrow="Add-on implementation"
                description="Most fixes start as a business question. When the answer involves a website, an integration, or new software, the same team that understood the problem builds it."
              >
                <template #title>
                  <span id="technical-heading">Technology, when the fix needs it.</span>
                </template>
              </SectionHeading>
              <!-- PLACEHOLDER IMAGE: product or dashboard screenshot from a real project. -->
              <ThemedImage
                v-reveal="100"
                src="/images/placeholders/systems-screenshot.webp"
                dark-src="/images/placeholders/systems-screenshot-dark.webp"
                sizes="100vw lg:520px"
                class="mt-12 aspect-16/10 rounded-[min(2vw,var(--radius-xl))]"
                img-class="object-left-top"
              />
            </div>
          </div>

          <dl class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            <div v-for="area in technical" :key="area.slug" v-reveal class="flex flex-col">
              <dt>
                <NuxtLink
                  :to="{ path: '/services', hash: `#${area.slug}` }"
                  class="group flex items-center gap-x-3 text-lg/7 font-semibold text-stone-950 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 dark:text-white dark:hover:text-neutral-300 dark:focus-visible:outline-white"
                >
                  <AreaIcon :name="area.icon" class="stroke-brand-700 dark:stroke-neutral-400" />
                  {{ area.name }}
                </NuxtLink>
              </dt>
              <dd class="mt-3 text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
                {{ area.summary }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Industries -->
    <section aria-labelledby="industries-heading" class="border-t border-stone-950/5 py-24 sm:py-32 dark:border-white/10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="flex flex-col gap-x-8 gap-y-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            v-reveal
            eyebrow="Who we work with"
            description="Services are designed around niche businesses and organizations with mixed revenue, physical spaces, communities, or products to ship."
          >
            <template #title>
              <span id="industries-heading">Built for businesses that don’t fit a template.</span>
            </template>
          </SectionHeading>
          <ArrowLink to="/industries" class="shrink-0">
            All industries
          </ArrowLink>
        </div>

        <ul role="list" class="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(industry, index) in industries" :key="industry.slug" v-reveal="(index % 3) * 100" class="flex">
            <IndustryCard :industry class="flex-1" />
          </li>
        </ul>
      </div>
    </section>

    <!-- Process -->
    <section aria-labelledby="process-heading" class="bg-stone-50 py-24 sm:py-32 dark:bg-white/2.5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          v-reveal
          eyebrow="How it works"
          description="Every engagement is scoped in writing first, so you know what is included, what is not, and what it costs."
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

    <TestimonialsSection />

    <CtaSection emphasis="soft" />
  </div>
</template>

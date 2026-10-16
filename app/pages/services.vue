<script setup lang="ts">
const { data: areas } = await useServiceAreas()

const serviceCount = computed(() => areas.value.reduce((total, area) => total + area.services.length, 0))
const advisoryCount = computed(() => areas.value.filter(area => area.kind === 'advisory').reduce((total, area) => total + area.services.length, 0))

const quotingNotes = [
  { term: 'Ranges and quotes', detail: 'Ranges are planning prices for the included scope. Your final fixed quote follows discovery and a written statement of work.' },
  { term: 'Third-party costs', detail: 'Software subscriptions, hosting, payment processing, ad spend, content production, and tax filings are separate unless listed in a proposal.' },
  { term: 'Changes', detail: 'Fixed projects include one agreed acceptance pass. New features, additional systems, and major data cleanup use a change order.' },
  { term: 'Monthly plans', detail: 'Agreements define included hours and response windows. Unused hours do not roll over unless stated.' },
  { term: 'Accessibility', detail: 'Accessibility work targets agreed WCAG criteria. An audit or fix package does not guarantee legal compliance.' },
]

const formatFit = (fit: string) => fit.replaceAll(';', ',')

// Scroll spy for the area navigation.
const active = ref<string>()
const pillNav = useTemplateRef<HTMLElement>('pillNav')

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) active.value = entry.target.id
    }
  }, { rootMargin: '-30% 0px -60% 0px' })
  document.querySelectorAll('[data-area]').forEach(section => observer.observe(section))
  onBeforeUnmount(() => observer.disconnect())
})

// Keep the active pill visible in the horizontally scrolling mobile nav.
watch(active, (slug) => {
  const container = pillNav.value
  const pill = container?.querySelector<HTMLElement>(`[data-pill="${slug}"]`)
  if (!container || !pill) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  container.scrollTo({ left: pill.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' })
})

useSeoMeta({
  title: 'Services and pricing',
  description: 'Bookkeeping, forecasting, pricing reviews, websites, integrations, accessibility, apps, automation, analytics, and support, each with a planning price range and defined scope.',
})
</script>

<template>
  <div>
    <section class="pt-16 pb-16 sm:pt-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          :level="1"
          eyebrow="Services and pricing"
          title="Every service, scoped and priced."
          description="Financial and business advisory first, with technical implementation available as an add-on. Each service lists what is included, what moves the price, and a planning range in USD."
        />

        <dl class="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-stone-950/10 pt-8 sm:grid-cols-4 dark:border-white/10">
          <div>
            <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
              Services in the catalog
            </dt>
            <dd class="mt-1 font-display text-5xl text-stone-950 tabular-nums dark:text-white">
              {{ serviceCount }}
            </dd>
          </div>
          <div>
            <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
              Financial foundations
            </dt>
            <dd class="mt-1 font-display text-5xl text-stone-950 tabular-nums dark:text-white">
              {{ advisoryCount }}
            </dd>
          </div>
          <div>
            <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
              Technical service areas
            </dt>
            <dd class="mt-1 font-display text-5xl text-stone-950 tabular-nums dark:text-white">
              {{ areas.filter(area => area.kind === 'technical').length }}
            </dd>
          </div>
          <div>
            <dt class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
              Billing options
            </dt>
            <dd class="mt-1 text-lg/8 text-stone-950 sm:mt-3 dark:text-white">
              Fixed, monthly, hourly
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Mobile area navigation -->
    <nav aria-label="Service areas" class="sticky top-20 z-30 border-y border-stone-950/5 bg-white/85 backdrop-blur-md lg:hidden dark:border-white/10 dark:bg-neutral-950/80">
      <ul ref="pillNav" role="list" class="flex gap-x-2 overflow-x-auto px-6 py-3 [scrollbar-width:none]">
        <li v-for="area in areas" :key="area.slug" class="shrink-0">
          <a
            :href="`#${area.slug}`"
            :data-pill="area.slug"
            :aria-current="active === area.slug ? 'true' : undefined"
            class="flex rounded-full px-3 py-1.5 text-base/6 whitespace-nowrap text-stone-600 ring-1 ring-stone-950/10 ring-inset aria-[current=true]:bg-stone-950/5 aria-[current=true]:text-stone-950 sm:text-sm/6 dark:text-neutral-400 dark:ring-white/10 dark:aria-[current=true]:bg-white/10 dark:aria-[current=true]:text-white"
          >
            {{ area.name }}
          </a>
        </li>
      </ul>
    </nav>

    <div class="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
      <div class="grid gap-x-8 lg:grid-cols-12">
        <!-- Desktop area navigation -->
        <nav aria-label="Service areas" class="max-lg:hidden lg:col-span-3">
          <div class="sticky top-32 border-t border-stone-950/10 pt-6 dark:border-white/10">
            <p class="text-sm/6 font-semibold text-stone-950 dark:text-white">
              Service areas
            </p>
            <ul role="list" class="mt-4 grid gap-y-1">
              <li v-for="area in areas" :key="area.slug">
                <a
                  :href="`#${area.slug}`"
                  :aria-current="active === area.slug ? 'true' : undefined"
                  class="-mx-3 flex rounded-lg px-3 py-1.5 text-sm/6 text-stone-600 hover:bg-stone-950/5 hover:text-stone-950 aria-[current=true]:bg-stone-950/5 aria-[current=true]:text-stone-950 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white dark:aria-[current=true]:bg-white/10 dark:aria-[current=true]:text-white"
                >
                  {{ area.name }}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="lg:col-span-9">
          <section
            v-for="area in areas"
            :id="area.slug"
            :key="area.slug"
            data-area
            :aria-labelledby="`${area.slug}-heading`"
            class="scroll-mt-40 border-t border-stone-950/10 pt-12 pb-20 first:border-t-0 first:pt-6 lg:scroll-mt-28 dark:border-white/10"
          >
            <div v-reveal>
              <div class="flex items-center gap-x-3">
                <AreaIcon :name="area.icon" class="stroke-brand-700 dark:stroke-neutral-400" />
                <p class="text-base/7 font-semibold text-brand-700 sm:text-sm/6 dark:text-neutral-400">
                  {{ area.kind === 'advisory' ? 'Advisory' : 'Technical add-on' }}
                </p>
              </div>
              <h2 :id="`${area.slug}-heading`" class="mt-4 font-display text-5xl tracking-tight text-balance text-stone-950 dark:text-white">
                {{ area.name }}
              </h2>
              <p class="mt-6 max-w-[48ch] text-lg/8 text-pretty text-stone-950 dark:text-white">
                {{ area.summary }}
              </p>
              <p class="mt-4 max-w-[56ch] text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
                {{ area.description }}
              </p>
            </div>

            <ul role="list" class="mt-10 divide-y divide-stone-950/10 dark:divide-white/10">
              <li v-for="service in area.services" :key="service.id" v-reveal class="grid gap-x-8 gap-y-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto]">
                <div class="min-w-0">
                  <h3 class="text-lg/7 font-semibold text-stone-950 dark:text-white">
                    {{ service.name }}
                  </h3>
                  <p class="mt-2 max-w-[56ch] text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
                    {{ service.scope }}
                  </p>
                  <dl class="mt-4 grid gap-y-1 text-base/7 sm:text-sm/6">
                    <div class="flex flex-wrap gap-x-2">
                      <dt class="font-medium text-stone-950 dark:text-white">
                        Price depends on
                      </dt>
                      <dd class="text-stone-600 dark:text-neutral-400">
                        {{ service.drivers }}
                      </dd>
                    </div>
                    <div class="flex flex-wrap gap-x-2">
                      <dt class="font-medium text-stone-950 dark:text-white">
                        Often relevant for
                      </dt>
                      <dd class="text-stone-600 dark:text-neutral-400">
                        {{ formatFit(service.fit) }}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div class="flex flex-col gap-y-3 sm:items-end sm:text-right">
                  <p class="text-lg/7 font-semibold text-stone-950 tabular-nums dark:text-white">
                    {{ formatRange(service) }}
                  </p>
                  <p class="-mt-3 text-base/7 text-stone-500 sm:text-sm/6 dark:text-neutral-400">
                    {{ billingUnit(service.billing) }}
                  </p>
                  <ArrowLink :to="{ path: '/contact', query: { service: service.id } }" class="text-base/7 sm:text-sm/6">
                    Ask about this<span class="sr-only">: {{ service.name }}</span>
                  </ArrowLink>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <section aria-labelledby="quoting-heading" class="bg-stone-50 py-24 sm:py-32 dark:bg-white/2.5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <SectionHeading
            v-reveal
            eyebrow="Before you request a quote"
            description="The same terms apply across the catalog."
            class="lg:col-span-4"
          >
            <template #title>
              <span id="quoting-heading">How quotes work.</span>
            </template>
          </SectionHeading>
          <dl class="divide-y divide-stone-950/10 lg:col-span-7 lg:col-start-6 dark:divide-white/10">
            <div v-for="note in quotingNotes" :key="note.term" v-reveal class="grid gap-x-8 gap-y-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-3">
              <dt class="text-base/7 font-medium text-stone-950 dark:text-white">
                {{ note.term }}
              </dt>
              <dd class="text-base/7 text-pretty text-stone-600 sm:col-span-2 dark:text-neutral-400">
                {{ note.detail }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <CtaSection
      title="Not sure which service fits?"
      description="Describe the problem instead. We will recommend a starting point and put the scope in writing before any work begins."
    />
  </div>
</template>

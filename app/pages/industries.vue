<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'

const [{ data: industries }, { data: areas }] = await Promise.all([useIndustries(), useServiceAreas()])

const services = computed(() => indexServices(areas.value))

useSeoMeta({
  title: 'Industries',
  description: 'Financial, operational, and technical services designed for content creators, kava and kratom bars, third spaces, nonprofits, TCG and tabletop businesses, and tech startups.',
})
</script>

<template>
  <div>
    <section class="pt-16 pb-20 sm:pt-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          :level="1"
          eyebrow="Industries"
          title="Designed for niche businesses and the people who run them."
          description="Mixed revenue, physical spaces, communities, events, and products to ship. Here is where the services are aimed, and a typical place to start for each."
        />
        <ul role="list" class="mt-12 flex flex-wrap gap-2">
          <li v-for="industry in industries" :key="industry.slug">
            <a
              :href="`#${industry.slug}`"
              class="flex rounded-full px-3 py-1.5 text-base/6 text-stone-600 ring-1 ring-stone-950/10 ring-inset hover:bg-stone-950/5 hover:text-stone-950 sm:text-sm/6 dark:text-neutral-400 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {{ industry.name }}
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section
      v-for="(industry, index) in industries"
      :id="industry.slug"
      :key="industry.slug"
      :aria-labelledby="`${industry.slug}-heading`"
      class="scroll-mt-20 border-t border-stone-950/5 py-20 sm:py-28 dark:border-white/10"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid items-start gap-x-8 gap-y-12 lg:grid-cols-12">
          <!-- PLACEHOLDER IMAGE: photograph representing this industry. Landscape, about 4:3. -->
          <ThemedImage
            v-reveal
            :src="industry.image"
            :dark-src="industry.imageDark"
            :alt="industry.imageAlt"
            sizes="100vw lg:600px"
            class="aspect-4/3 rounded-[min(2.5vw,var(--radius-2xl))] lg:col-span-6"
            :class="index % 2 === 1 && 'lg:col-start-7 lg:row-start-1'"
          />

          <div
            class="lg:col-span-5"
            :class="index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'"
          >
            <div v-reveal>
              <h2 :id="`${industry.slug}-heading`" class="max-w-[30ch] font-display text-5xl tracking-tight text-balance text-stone-950 dark:text-white">
                {{ industry.name }}
              </h2>
              <p class="mt-6 max-w-[48ch] text-lg/8 text-pretty text-stone-600 dark:text-neutral-400">
                {{ industry.summary }}
              </p>
            </div>

            <div v-reveal="80" class="mt-10">
              <h3 class="text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
                Where we typically help
              </h3>
              <ul role="list" class="mt-4 grid gap-y-3">
                <li v-for="need in industry.needs" :key="need" class="flex gap-x-3 text-base/7 text-stone-600 dark:text-neutral-400">
                  <CheckIcon class="size-5 h-lh shrink-0 fill-brand-700 dark:fill-neutral-400" aria-hidden="true" />
                  {{ need }}
                </li>
              </ul>
            </div>

            <div v-reveal="160" class="mt-10 border-t border-stone-950/10 pt-8 dark:border-white/10">
              <h3 class="text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
                A common starting combination
              </h3>
              <p class="mt-1 text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                {{ industry.goal }}
              </p>
              <ul role="list" class="mt-6 divide-y divide-stone-950/5 dark:divide-white/10">
                <template v-for="id in industry.services" :key="id">
                  <li v-if="services.get(id)" class="flex items-baseline justify-between gap-x-6 py-3 first:pt-0">
                    <NuxtLink
                      :to="{ path: '/services', hash: `#${services.get(id)!.area.slug}` }"
                      class="min-w-0 text-base/7 font-medium text-stone-950 hover:text-brand-700 sm:text-sm/6 dark:text-white dark:hover:text-neutral-300"
                    >
                      {{ services.get(id)!.service.name }}
                    </NuxtLink>
                    <p class="shrink-0 text-base/7 text-stone-600 tabular-nums sm:text-sm/6 dark:text-neutral-400">
                      from {{ formatPrice(services.get(id)!.service.from) }}<span v-if="services.get(id)!.service.billing === 'Monthly'">/mo</span>
                    </p>
                  </li>
                </template>
              </ul>
              <p class="mt-6 text-base/7 text-pretty text-stone-500 sm:text-sm/6 dark:text-neutral-400">
                <span class="font-medium text-stone-950 dark:text-white">Scope watch-outs:</span> {{ industry.watchouts }} Each service is quoted at its own scope; this is not a package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="other-heading" class="bg-stone-50 py-24 sm:py-32 dark:bg-white/2.5">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid items-end gap-x-8 gap-y-10 lg:grid-cols-12">
          <SectionHeading
            v-reveal
            eyebrow="Not on the list?"
            description="The same services fit many small and midsize businesses with similar financial, operational, or technical needs. If the problem sounds familiar, it is worth a conversation."
            class="lg:col-span-7"
          >
            <template #title>
              <span id="other-heading">Your business does not need to fit a category.</span>
            </template>
          </SectionHeading>
          <div v-reveal="100" class="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <ArrowLink to="/services">
              Browse all services
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>

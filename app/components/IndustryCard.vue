<script setup lang="ts">
import type { Industry } from '~/composables/useCatalog'

defineProps<{ industry: Industry }>()
</script>

<template>
  <NuxtLink
    :to="{ path: '/industries', hash: `#${industry.slug}` }"
    class="group flex flex-col gap-6 rounded-[min(2.5vw,var(--radius-2xl))] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 dark:focus-visible:outline-white"
  >
    <!-- PLACEHOLDER IMAGE: swap for photography of this kind of business. -->
    <ThemedImage
      :src="industry.image"
      :dark-src="industry.imageDark"
      :alt="industry.imageAlt"
      sizes="100vw sm:50vw lg:400px"
      class="aspect-4/3 rounded-[min(2.5vw,var(--radius-2xl))]"
      img-class="transition-transform duration-700 ease-(--ease-out-quart) group-hover:scale-[1.03] motion-reduce:transition-none"
    />
    <div>
      <h3 class="text-lg/7 font-semibold text-stone-950 group-hover:text-brand-700 dark:text-white dark:group-hover:text-neutral-300">
        {{ industry.name }}
      </h3>
      <p class="mt-2 text-base/7 text-pretty text-stone-600 sm:text-sm/6 dark:text-neutral-400">
        {{ industry.summary }}
      </p>
    </div>
  </NuxtLink>
</template>

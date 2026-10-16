<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/16/solid'
import type { RouteLocationRaw } from 'vue-router'

// The site-wide secondary action: a text link with a nudging arrow.
defineProps<{
  to: RouteLocationRaw
  tone?: 'default' | 'inverse'
}>()
</script>

<template>
  <NuxtLink
    :to
    class="group inline-flex items-center gap-x-1.5 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
    :class="tone === 'inverse'
      ? 'text-white focus-visible:outline-white'
      : 'text-brand-700 hover:text-brand-900 focus-visible:outline-brand-700 dark:text-white dark:hover:text-neutral-300 dark:focus-visible:outline-white'"
  >
    <slot />
    <ArrowRightIcon
      class="size-4 shrink-0 fill-current transition-transform duration-200 ease-(--ease-out-quart) group-hover:translate-x-0.5 motion-reduce:transition-none"
      aria-hidden="true"
    />
  </NuxtLink>
</template>

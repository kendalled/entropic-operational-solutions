<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'soft' | 'inverse'
  size?: 'sm' | 'md'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
})

const NuxtLink = resolveComponent('NuxtLink')

const variants = {
  // The page's single main action.
  primary: 'bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-brand-700 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus-visible:outline-white',
  secondary: 'text-stone-950 ring-1 ring-stone-950/15 ring-inset hover:bg-stone-950/5 focus-visible:outline-brand-700 dark:text-white dark:ring-white/20 dark:hover:bg-white/10 dark:focus-visible:outline-white',
  // Muted action on the maroon call-to-action panel.
  soft: 'bg-white/10 text-white ring-1 ring-white/25 ring-inset hover:bg-white/15 focus-visible:outline-white',
  // Main action on the maroon call-to-action panel.
  inverse: 'bg-white text-brand-800 hover:bg-brand-50 focus-visible:outline-white dark:text-neutral-950 dark:hover:bg-neutral-200',
}

const sizes = {
  sm: 'px-3 py-2 text-base/6 sm:py-1.5 sm:text-sm/6',
  md: 'px-4 py-3 text-base/6 sm:px-3.5 sm:py-2.5 sm:text-sm/6',
}
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :to="props.to"
    :type="props.to ? undefined : props.type"
    :disabled="props.to ? undefined : props.disabled"
    class="inline-flex items-center justify-center gap-x-2 rounded-full font-semibold whitespace-nowrap transition-transform duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none"
    :class="[variants[props.variant], sizes[props.size]]"
  >
    <slot />
  </component>
</template>

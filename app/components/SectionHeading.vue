<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title?: string
  description?: string
  align?: 'left' | 'center'
  level?: 1 | 2
}>(), {
  align: 'left',
  level: 2,
})
</script>

<template>
  <div :class="align === 'center' && 'text-center'">
    <p
      v-if="eyebrow"
      class="text-base/7 font-semibold text-brand-700 sm:text-sm/6 dark:text-neutral-400"
    >
      {{ eyebrow }}
    </p>
    <component
      :is="`h${level}`"
      class="font-display tracking-tight text-balance text-stone-950 dark:text-white [&_em]:text-brand-700 dark:[&_em]:text-white"
      :class="[
        eyebrow && 'mt-3',
        align === 'center' && 'mx-auto',
        level === 1 ? 'max-w-[24ch] text-6xl lg:max-w-[20ch] lg:text-7xl' : 'max-w-[30ch] text-5xl lg:max-w-[24ch] lg:text-6xl',
      ]"
    >
      <slot name="title">{{ title }}</slot>
    </component>
    <p
      v-if="description || $slots.description"
      class="mt-6 max-w-[48ch] text-lg/8 text-pretty text-stone-600 dark:text-neutral-400"
      :class="align === 'center' && 'mx-auto'"
    >
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>

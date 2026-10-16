<script setup lang="ts">
const steps = [
  {
    title: 'Discovery conversation',
    description: 'We learn how the business runs, where the numbers live, and what is getting in the way.',
  },
  {
    title: 'Written scope',
    description: 'You review a statement of work with deliverables, price, and exclusions before any work begins.',
  },
  {
    title: 'Delivery and acceptance',
    description: 'Work follows the agreed scope. Fixed projects include one acceptance pass; new requests go through a change order.',
  },
  {
    title: 'Handoff and support',
    description: 'Documentation, training, and a plain-language walkthrough. Monthly support is optional, with defined hours.',
  },
]
</script>

<template>
  <ol role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
    <li v-for="(step, index) in steps" :key="step.title" v-reveal="index * 100" class="border-t border-stone-950/10 pt-6 dark:border-white/10">
      <p class="font-display text-5xl text-brand-700 tabular-nums dark:text-neutral-500" aria-hidden="true">
        {{ String(index + 1).padStart(2, '0') }}
      </p>
      <h3 class="mt-6 text-lg/7 font-semibold text-stone-950 dark:text-white">
        {{ step.title }}
      </h3>
      <p class="mt-2 text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
        {{ step.description }}
      </p>
    </li>
  </ol>
</template>

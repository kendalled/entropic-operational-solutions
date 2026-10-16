<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/20/solid'

const { toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="group relative grid size-9 place-items-center rounded-full hover:bg-stone-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:hover:bg-white/10 dark:focus-visible:outline-white"
    @click="toggle"
  >
    <!-- The accessible name follows the theme through CSS, so it is right before hydration. -->
    <span class="sr-only dark:hidden">Switch to dark theme</span>
    <span class="sr-only not-dark:hidden">Switch to light theme</span>
    <SunIcon
      class="col-start-1 row-start-1 size-5 fill-stone-600 transition-[transform,opacity] duration-300 ease-(--ease-out-quart) group-hover:fill-stone-950 motion-reduce:transition-none dark:scale-50 dark:-rotate-90 dark:opacity-0"
      aria-hidden="true"
    />
    <MoonIcon
      class="col-start-1 row-start-1 size-5 fill-neutral-400 transition-[transform,opacity] duration-300 ease-(--ease-out-quart) group-hover:fill-white not-dark:scale-50 not-dark:rotate-90 not-dark:opacity-0 motion-reduce:transition-none"
      aria-hidden="true"
    />
    <span class="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden" aria-hidden="true" />
  </button>
</template>

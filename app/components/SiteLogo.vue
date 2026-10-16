<script setup lang="ts">
// Orbital is the confirmed brand mark. Maroon on light surfaces, white on dark.
// Both variants render; CSS shows the one matching the active theme, so the
// logo is correct on first paint (the theme class is set before render).
withDefaults(defineProps<{
  layout?: 'responsive' | 'wordmark' | 'icon'
  wordmarkWidth?: number
  iconSize?: number
}>(), {
  layout: 'responsive',
  wordmarkWidth: 200,
  iconSize: 40,
})
</script>

<template>
  <NuxtLink
    to="/"
    aria-label="Entropic Operational Solutions homepage"
    class="-m-1.5 flex shrink-0 rounded-lg p-1.5 focus-visible:outline-2 focus-visible:outline-brand-700 dark:focus-visible:outline-white"
  >
    <span class="flex dark:hidden">
      <BrandLogo design="orbital" color="maroon" :layout :wordmark-width="wordmarkWidth" :icon-size="iconSize" alt="" />
    </span>
    <span class="flex not-dark:hidden">
      <BrandLogo design="orbital" color="white" :layout :wordmark-width="wordmarkWidth" :icon-size="iconSize" alt="" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  design?: 'gimbal' | 'orbital' | 'precision'
  color?: 'bronze' | 'monochrome' | 'maroon' | 'white'
  layout?: 'responsive' | 'icon' | 'wordmark'
  alt?: string
  iconSize?: number
  wordmarkWidth?: number
}>(), {
  design: 'gimbal',
  color: 'bronze',
  layout: 'responsive',
  alt: 'Entropic Operational Solutions',
  iconSize: 40,
  wordmarkWidth: 280,
})

const asset = (layout: 'icon' | 'wordmark') =>
  `/brand/logos/gyroscope-${props.design}-${props.color}-${layout}.svg`
</script>

<template>
  <picture
    class="brand-logo"
    :class="`brand-logo--${layout}`"
    :style="{
      '--brand-icon-size': `${iconSize}px`,
      '--brand-wordmark-width': `${wordmarkWidth}px`,
    }"
  >
    <source
      v-if="layout === 'responsive'"
      media="(min-width: 640px)"
      :srcset="asset('wordmark')"
    >
    <img
      :src="asset(layout === 'wordmark' ? 'wordmark' : 'icon')"
      :alt="alt"
      :width="layout === 'wordmark' ? 432 : 128"
      height="128"
      decoding="async"
    >
  </picture>
</template>

<style scoped>
.brand-logo {
  display: inline-block;
  width: var(--brand-icon-size);
  max-width: 100%;
  aspect-ratio: 1;
  vertical-align: middle;
}

.brand-logo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-logo--wordmark {
  width: var(--brand-wordmark-width);
  aspect-ratio: 27 / 8;
}

@media (min-width: 640px) {
  .brand-logo--responsive {
    width: var(--brand-wordmark-width);
    aspect-ratio: 27 / 8;
  }
}
</style>

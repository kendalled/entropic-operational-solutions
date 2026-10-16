<script setup lang="ts">
// Image slot with optional dark-mode artwork. Everything under
// /images/placeholders is temporary art; replace the files (keeping names)
// or pass new paths when final photography arrives.
withDefaults(defineProps<{
  src: string
  darkSrc?: string
  alt?: string
  sizes?: string
  priority?: boolean
  imgClass?: string
}>(), {
  alt: '',
  sizes: '100vw sm:100vw md:100vw lg:50vw',
})
</script>

<template>
  <div class="relative overflow-hidden bg-stone-100 outline-1 -outline-offset-1 outline-black/5 dark:bg-neutral-900 dark:outline-white/10">
    <NuxtImg
      :src
      :alt
      :sizes
      format="webp"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      class="size-full object-cover"
      :class="[imgClass, darkSrc && 'dark:hidden']"
    />
    <NuxtImg
      v-if="darkSrc"
      :src="darkSrc"
      :alt
      :sizes
      format="webp"
      loading="lazy"
      class="size-full object-cover not-dark:hidden"
      :class="imgClass"
    />
    <slot />
  </div>
</template>

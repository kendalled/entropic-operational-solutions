<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: () => (notFound.value ? 'Page not found' : 'Something went wrong') })
</script>

<template>
  <NuxtLayout>
    <section class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p class="font-display text-5xl text-brand-700 tabular-nums dark:text-neutral-500">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-6 max-w-[20ch] font-display text-6xl tracking-tight text-balance text-stone-950 lg:text-7xl dark:text-white">
          {{ notFound ? 'This page is off the map.' : 'Something went wrong.' }}
        </h1>
        <p class="mt-6 max-w-[48ch] text-lg/8 text-pretty text-stone-600 dark:text-neutral-400">
          {{ notFound ? 'The page you are looking for does not exist or has moved.' : 'Please try again in a moment.' }}
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <UiButton @click="clearError({ redirect: '/' })">
            Back to the homepage
          </UiButton>
          <ArrowLink to="/services">
            Browse services
          </ArrowLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

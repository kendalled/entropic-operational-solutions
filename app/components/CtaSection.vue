<script setup lang="ts">
// `emphasis` decides whether the panel's button is the page's main action.
// On the home page the hero already holds the primary button.
withDefaults(defineProps<{
  title?: string
  description?: string
  emphasis?: 'primary' | 'soft'
}>(), {
  title: 'Start with a conversation about your numbers.',
  description: 'Tell us what is going on in the business. We will suggest a starting point and a written scope you can review before any work begins.',
  emphasis: 'primary',
})
</script>

<template>
  <section aria-labelledby="cta-heading" class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="relative isolate overflow-hidden rounded-3xl bg-brand-700 px-6 py-20 text-center sm:px-16 sm:py-24 dark:rounded-none dark:border-t dark:border-white/10 dark:bg-transparent dark:px-0 dark:pb-0">
        <img
          src="/brand/logos/gyroscope-orbital-white-icon.svg"
          alt=""
          aria-hidden="true"
          width="128"
          height="128"
          class="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-[30rem] opacity-10 max-sm:hidden dark:hidden"
        >
        <h2 id="cta-heading" v-reveal class="mx-auto max-w-[30ch] font-display text-5xl tracking-tight text-balance text-white lg:max-w-[24ch] lg:text-6xl">
          {{ title }}
        </h2>
        <p v-reveal="100" class="mx-auto mt-6 max-w-[48ch] text-lg/8 text-pretty text-brand-100 dark:text-neutral-400">
          {{ description }}
        </p>
        <div v-reveal="200" class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <UiButton to="/contact" :variant="emphasis === 'primary' ? 'inverse' : 'soft'">
            Book a discovery call
          </UiButton>
          <ArrowLink to="/pricing" tone="inverse">
            How pricing works
          </ArrowLink>
        </div>
      </div>
    </div>
  </section>
</template>

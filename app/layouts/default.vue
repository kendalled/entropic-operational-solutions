<template>
  <div class="isolate flex min-h-dvh flex-col bg-white font-sans text-stone-950 dark:bg-neutral-950 dark:text-white">
    <a
      href="#main"
      class="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-brand-700 px-4 py-2 text-sm/6 font-semibold text-white focus-visible:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:bg-white dark:text-neutral-950"
    >
      Skip to content
    </a>
    <SiteHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

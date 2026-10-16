<script setup lang="ts">
const { data: areas } = await useServiceAreas()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-stone-950/5 dark:border-white/10">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div class="grid gap-x-8 gap-y-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <SiteLogo layout="wordmark" :wordmark-width="216" />
          <p class="mt-6 max-w-[40ch] text-base/7 text-pretty text-stone-600 sm:text-sm/6 dark:text-neutral-400">
            Financial and business advisory for small and midsize businesses, with technical implementation when the fix involves software.
          </p>
        </div>

        <nav aria-label="Footer" class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          <div class="col-span-2">
            <h2 class="text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
              Services
            </h2>
            <ul role="list" class="mt-4 grid gap-y-3 sm:grid-cols-2 sm:gap-x-8">
              <li v-for="area in areas" :key="area.slug">
                <NuxtLink
                  :to="{ path: '/services', hash: `#${area.slug}` }"
                  class="text-base/7 font-normal text-stone-600 hover:text-stone-950 sm:text-sm/6 dark:text-neutral-400 dark:hover:text-white"
                >
                  {{ area.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="sm:col-start-3">
            <h2 class="text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
              Company
            </h2>
            <ul role="list" class="mt-4 grid gap-y-3">
              <li v-for="item in [...mainNavigation, { label: 'Contact', to: '/contact' }]" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="text-base/7 font-normal text-stone-600 hover:text-stone-950 sm:text-sm/6 dark:text-neutral-400 dark:hover:text-white"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="mt-16 flex flex-col-reverse gap-6 border-t border-stone-950/5 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <p class="text-base/7 text-stone-500 sm:text-sm/6 dark:text-neutral-400">
          &copy; {{ year }} Entropic Operational Solutions. Prices are planning ranges in USD.
        </p>
        <ThemeSwitcher />
      </div>
    </div>
  </footer>
</template>

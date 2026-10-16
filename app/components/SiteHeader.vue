<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const menu = useTemplateRef<HTMLDialogElement>('menu')

const openMenu = () => menu.value?.showModal()
const closeMenu = () => menu.value?.close()

// Close the menu after navigating from it.
watch(() => route.fullPath, closeMenu)

// Clicks on the dialog element itself (not its panel) land on the backdrop.
function onDialogClick(event: MouseEvent) {
  if (event.target === menu.value) closeMenu()
}

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-stone-950/5 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/80">
    <nav aria-label="Main" class="mx-auto flex h-20 max-w-7xl items-center gap-x-6 px-6 lg:px-8">
      <div class="flex flex-1 items-center">
        <SiteLogo />
      </div>

      <ul role="list" class="flex items-center gap-x-1 max-lg:hidden">
        <li v-for="item in mainNavigation" :key="item.to">
          <NuxtLink
            :to="item.to"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            class="rounded-full px-3 py-2 text-sm/6 font-medium text-stone-600 hover:bg-stone-950/5 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-brand-700 aria-[current=page]:bg-stone-950/5 aria-[current=page]:text-stone-950 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:outline-white dark:aria-[current=page]:bg-white/10 dark:aria-[current=page]:text-white"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="flex flex-1 items-center justify-end gap-x-2">
        <ThemeToggle class="max-lg:hidden" />
        <UiButton to="/contact" variant="secondary" size="sm" class="max-sm:hidden">
          Contact us
        </UiButton>
        <button
          type="button"
          class="relative -mr-2 grid size-10 place-items-center rounded-full text-stone-950 hover:bg-stone-950/5 focus-visible:outline-2 focus-visible:outline-brand-700 lg:hidden dark:text-white dark:hover:bg-white/10 dark:focus-visible:outline-white"
          aria-haspopup="dialog"
          @click="openMenu"
        >
          <span class="sr-only">Open menu</span>
          <Bars3Icon class="size-6 stroke-current" aria-hidden="true" />
          <span class="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <dialog
      ref="menu"
      aria-label="Menu"
      class="mobile-menu inset-x-0 top-0 bottom-auto m-0 h-auto max-h-dvh w-full max-w-none overflow-y-auto bg-white p-0 lg:hidden dark:bg-neutral-950"
      @click="onDialogClick"
    >
      <div class="border-b border-stone-950/5 dark:border-white/10">
        <div class="flex h-20 items-center justify-between px-6">
          <SiteLogo />
          <button
            type="button"
            autofocus
            class="relative -mr-2 grid size-10 place-items-center rounded-full text-stone-950 hover:bg-stone-950/5 focus-visible:outline-2 focus-visible:outline-brand-700 dark:text-white dark:hover:bg-white/10 dark:focus-visible:outline-white"
            @click="closeMenu"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6 stroke-current" aria-hidden="true" />
            <span class="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden" aria-hidden="true" />
          </button>
        </div>
        <div class="px-6 pt-2 pb-8">
          <ul role="list" class="divide-y divide-stone-950/5 dark:divide-white/10">
            <li v-for="item in mainNavigation" :key="item.to">
              <NuxtLink
                :to="item.to"
                :aria-current="isActive(item.to) ? 'page' : undefined"
                class="flex py-4 font-display text-3xl text-stone-600 hover:text-stone-950 focus-visible:outline-2 focus-visible:outline-brand-700 aria-[current=page]:text-stone-950 dark:text-neutral-400 dark:hover:text-white dark:focus-visible:outline-white dark:aria-[current=page]:text-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-6 flex flex-col gap-6">
            <UiButton to="/contact" variant="secondary" class="w-full">
              Contact us
            </UiButton>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </dialog>
  </header>
</template>

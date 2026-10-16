<script setup lang="ts">
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/vue/16/solid'
import type { Component } from 'vue'
import type { ThemePreference } from '~/composables/useTheme'

const { preference, setPreference } = useTheme()
const name = useId()

// The stored choice is only readable in the browser; sync after hydration.
onMounted(() => {
  preference.value = readStoredPreference()
})

const options: { value: ThemePreference, label: string, icon: Component }[] = [
  { value: 'system', label: 'System', icon: ComputerDesktopIcon },
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
]
</script>

<template>
  <fieldset>
    <legend class="sr-only">Color theme</legend>
    <div class="flex w-fit gap-x-1 rounded-full p-1 ring-1 ring-stone-950/10 ring-inset dark:ring-white/10">
      <label
        v-for="option in options"
        :key="option.value"
        class="group flex cursor-pointer items-center gap-x-1.5 rounded-full py-1.5 pr-3 pl-2 text-base/6 text-stone-600 select-none hover:text-stone-950 has-checked:bg-stone-950/5 has-checked:text-stone-950 has-focus-visible:outline-2 has-focus-visible:outline-brand-700 sm:py-1 sm:text-sm/6 dark:text-neutral-400 dark:hover:text-white dark:has-checked:bg-white/10 dark:has-checked:text-white dark:has-focus-visible:outline-white"
      >
        <input
          type="radio"
          :name
          class="sr-only"
          :value="option.value"
          :checked="preference === option.value"
          @change="setPreference(option.value)"
        >
        <component :is="option.icon" class="size-4 shrink-0 fill-current" aria-hidden="true" />
        {{ option.label }}
      </label>
    </div>
  </fieldset>
</template>

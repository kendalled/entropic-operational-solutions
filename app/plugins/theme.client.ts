import { THEME_STORAGE_KEY } from '~/composables/useTheme'

export default defineNuxtPlugin(() => {
  // Follow OS changes while the visitor hasn't picked a theme.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY)
    }
    catch {}
    if (!stored) applyTheme(event.matches)
  })
})

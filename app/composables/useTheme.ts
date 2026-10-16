export type ThemePreference = 'system' | 'light' | 'dark'

// Keep in sync with the inline script in nuxt.config.ts.
export const THEME_STORAGE_KEY = 'eos-theme'

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function resolveDark(preference: ThemePreference) {
  return preference === 'dark' || (preference === 'system' && prefersDark())
}

export function applyTheme(dark: boolean, animate = true) {
  const root = document.documentElement
  if (root.classList.contains('dark') === dark) return

  const update = () => {
    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
  }

  if (animate && document.startViewTransition && !prefersReducedMotion()) {
    document.startViewTransition(update)
  }
  else {
    update()
  }
}

export function useTheme() {
  const preference = useState<ThemePreference>('theme-preference', () => 'system')

  function setPreference(value: ThemePreference) {
    preference.value = value
    try {
      if (value === 'system') localStorage.removeItem(THEME_STORAGE_KEY)
      else localStorage.setItem(THEME_STORAGE_KEY, value)
    }
    catch {}
    applyTheme(resolveDark(value))
  }

  function toggle() {
    setPreference(document.documentElement.classList.contains('dark') ? 'light' : 'dark')
  }

  return { preference, setPreference, toggle }
}

export function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  }
  catch {}
  return 'system'
}

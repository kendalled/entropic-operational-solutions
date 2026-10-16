// v-reveal: fades and lifts an element in the first time it scrolls into view.
// Pass a number to stagger siblings, e.g. v-reveal="120" for a 120ms delay.
// Styling lives in main.css and is skipped for prefers-reduced-motion.
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined

  const getObserver = () => observer ??= new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.setAttribute('data-revealed', '')
      observer?.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    getSSRProps(binding) {
      return {
        'data-reveal': '',
        'style': binding.value ? `--reveal-delay: ${binding.value}ms` : undefined,
      }
    },
    mounted(el, binding) {
      el.setAttribute('data-reveal', '')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })
})

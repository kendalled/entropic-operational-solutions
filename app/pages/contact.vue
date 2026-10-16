<script setup lang="ts">
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const config = useRuntimeConfig()
const [{ data: areas }, { data: industries }] = await Promise.all([useServiceAreas(), useIndustries()])

const budgets = ['Under $2,500', '$2,500–$10,000', '$10,000–$25,000', '$25,000–$50,000', 'Over $50,000', 'Not sure yet']

// Prefill from "Ask about this" links on the services page (?service=SV06).
const requested = computed(() => {
  const id = typeof route.query.service === 'string' ? route.query.service : undefined
  return id ? indexServices(areas.value).get(id) : undefined
})

const form = reactive({
  name: '',
  email: '',
  business: '',
  businessType: '',
  budget: '',
  interests: requested.value ? [requested.value.area.name] : [] as string[],
  message: requested.value ? `I'm interested in ${requested.value.service.name}.\n\n` : '',
  website: '',
})

const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errors = ref<Record<string, string>>({})

async function submit() {
  status.value = 'sending'
  errors.value = {}
  if (config.public.netlifyForms) {
    if (!form.name.trim()) errors.value.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.value.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) errors.value.message = 'Please tell us a little more about what you need.'
    if (Object.keys(errors.value).length) {
      status.value = 'error'
      return
    }
  }
  try {
    if (config.public.netlifyForms) {
      const body = new URLSearchParams({
        'form-name': 'inquiry',
        ...form,
        interests: form.interests.join(', '),
      })
      await $fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
    }
    else {
      await $fetch('/api/contact', { method: 'POST', body: form })
    }
    status.value = 'sent'
  }
  catch (error: any) {
    errors.value = error?.data?.data?.errors ?? {}
    status.value = 'error'
  }
}

const inputClass = 'block w-full rounded-lg bg-white px-3 py-2.5 text-base/6 text-stone-950 outline-1 -outline-offset-1 outline-stone-950/15 placeholder:text-stone-400 focus:outline-2 focus:-outline-offset-1 focus:outline-brand-700 aria-invalid:outline-red-600 sm:py-1.5 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-neutral-500 dark:focus:outline-white dark:aria-invalid:outline-red-400'
const labelClass = 'text-base/7 font-medium text-stone-950 sm:text-sm/6 dark:text-white'

useSeoMeta({
  title: 'Contact',
  description: 'Tell us about your business and what you need. We will suggest a starting point and a written scope before any work begins.',
})
</script>

<template>
  <section class="pt-16 pb-24 sm:pt-24 sm:pb-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid gap-x-8 gap-y-16 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <SectionHeading
            :level="1"
            eyebrow="Contact"
            title="Tell us what is going on."
            description="A few details help us come prepared. There is no need to know which service you want; describing the problem is enough."
          />

          <h2 class="mt-12 text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
            What happens next
          </h2>
          <ol role="list" class="mt-6 grid gap-y-6">
            <li v-for="(step, index) in ['We read your note and reply with a few questions or times to talk.', 'A discovery conversation about how the business runs and what is in the way.', 'You receive a recommended starting point and a written scope to review.']" :key="step" class="flex gap-x-4">
              <span class="font-display text-3xl text-brand-700 tabular-nums dark:text-neutral-500" aria-hidden="true">{{ index + 1 }}</span>
              <p class="pt-1.5 text-base/7 text-pretty text-stone-600 dark:text-neutral-400">
                {{ step }}
              </p>
            </li>
          </ol>

          <!-- PLACEHOLDER IMAGE: friendly portrait or workspace photo. About 3:2. -->
          <ThemedImage
            src="/images/placeholders/financial.webp"
            sizes="100vw lg:480px"
            class="mt-12 aspect-3/2 rounded-[min(2.5vw,var(--radius-2xl))] max-lg:hidden"
          />
        </div>

        <div class="lg:col-span-6 lg:col-start-7">
          <Transition
            mode="out-in"
            enter-active-class="transition-[opacity,transform] duration-300 ease-(--ease-out-quart) motion-reduce:transition-none"
            enter-from-class="opacity-0 translate-y-2"
            leave-active-class="transition-opacity duration-150 ease-(--ease-out-quart) motion-reduce:transition-none"
            leave-to-class="opacity-0"
          >
            <div v-if="status === 'sent'" role="status" class="border-t border-stone-950/10 pt-8 dark:border-white/10">
              <CheckCircleIcon class="size-5 fill-brand-700 dark:fill-white" aria-hidden="true" />
              <h2 class="mt-4 font-display text-5xl tracking-tight text-stone-950 dark:text-white">
                Thank you.
              </h2>
              <p class="mt-4 max-w-[48ch] text-lg/8 text-pretty text-stone-600 dark:text-neutral-400">
                Your note is in. We will reply to {{ form.email }} with next steps.
              </p>
              <div class="mt-8">
                <ArrowLink to="/services">
                  Browse services in the meantime
                </ArrowLink>
              </div>
            </div>

            <form v-else name="inquiry" method="POST" :data-netlify="config.public.netlifyForms ? 'true' : undefined" :netlify-honeypot="config.public.netlifyForms ? 'website' : undefined" class="grid gap-x-6 gap-y-8 sm:grid-cols-2" novalidate @submit.prevent="submit">
              <input v-if="config.public.netlifyForms" type="hidden" name="form-name" value="inquiry">
              <div class="grid gap-y-2">
                <label for="name" :class="labelClass">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  :aria-invalid="errors.name ? 'true' : undefined"
                  :aria-describedby="errors.name ? 'name-error' : undefined"
                  :class="inputClass"
                >
                <p v-if="errors.name" id="name-error" class="text-base/7 text-red-700 sm:text-sm/6 dark:text-red-400">
                  {{ errors.name }}
                </p>
              </div>

              <div class="grid gap-y-2">
                <label for="email" :class="labelClass">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  :aria-invalid="errors.email ? 'true' : undefined"
                  :aria-describedby="errors.email ? 'email-error' : undefined"
                  :class="inputClass"
                >
                <p v-if="errors.email" id="email-error" class="text-base/7 text-red-700 sm:text-sm/6 dark:text-red-400">
                  {{ errors.email }}
                </p>
              </div>

              <div class="grid gap-y-2">
                <label for="business" :class="labelClass">
                  Business or organization <span class="font-normal text-stone-500 dark:text-neutral-400">(optional)</span>
                </label>
                <input id="business" v-model="form.business" name="business" type="text" autocomplete="organization" :class="inputClass">
              </div>

              <div class="grid gap-y-2">
                <label for="business-type" :class="labelClass">Type of business</label>
                <div class="inline-grid grid-cols-[1fr_--spacing(8)]">
                  <select id="business-type" v-model="form.businessType" name="businessType" class="col-span-full row-start-1 appearance-none pr-8" :class="inputClass">
                    <option value="">
                      Select one
                    </option>
                    <option v-for="industry in industries" :key="industry.slug" :value="industry.name">
                      {{ industry.name }}
                    </option>
                    <option value="Other">
                      Something else
                    </option>
                  </select>
                  <svg viewBox="0 0 8 5" width="8" height="5" fill="none" class="pointer-events-none col-start-2 row-start-1 place-self-center stroke-stone-500 dark:stroke-neutral-400" aria-hidden="true">
                    <path d="M.5.5 4 4 7.5.5" />
                  </svg>
                </div>
              </div>

              <fieldset class="sm:col-span-2">
                <legend :class="labelClass">
                  What would you like help with?
                </legend>
                <div class="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  <div v-for="area in areas" :key="area.slug" class="flex gap-x-3">
                    <div class="flex h-lh items-center text-base/7 sm:text-sm/6">
                      <span class="group inline-grid size-5 grid-cols-1 sm:size-4">
                        <input
                          :id="`interest-${area.slug}`"
                          v-model="form.interests"
                          type="checkbox"
                          name="interests"
                          :value="area.name"
                          class="col-start-1 row-start-1 appearance-none rounded-sm border border-stone-300 bg-white checked:border-brand-700 checked:bg-brand-700 indeterminate:border-brand-700 indeterminate:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:border-stone-300 disabled:bg-stone-100 disabled:checked:bg-stone-100 dark:border-white/10 dark:bg-white/5 dark:checked:border-white dark:checked:bg-white dark:indeterminate:border-white dark:indeterminate:bg-white dark:focus-visible:outline-white dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:checked:bg-white/10 forced-colors:appearance-auto"
                        >
                        <svg viewBox="0 0 14 14" fill="none" class="pointer-events-none col-start-1 row-start-1 size-7/8 self-center justify-self-center stroke-white group-has-disabled:stroke-stone-950/25 dark:stroke-neutral-950 dark:group-has-disabled:stroke-white/25" aria-hidden="true">
                          <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-not-has-checked:opacity-0" />
                          <path d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-not-has-indeterminate:opacity-0" />
                        </svg>
                      </span>
                    </div>
                    <label :for="`interest-${area.slug}`" class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                      {{ area.name }}
                    </label>
                  </div>
                </div>
              </fieldset>

              <div class="grid gap-y-2 sm:col-span-2">
                <label for="budget" :class="labelClass">
                  Budget range <span class="font-normal text-stone-500 dark:text-neutral-400">(optional)</span>
                </label>
                <div class="inline-grid grid-cols-[1fr_--spacing(8)]">
                  <select id="budget" v-model="form.budget" name="budget" class="col-span-full row-start-1 appearance-none pr-8" :class="inputClass">
                    <option value="">
                      Select a range
                    </option>
                    <option v-for="budget in budgets" :key="budget" :value="budget">
                      {{ budget }}
                    </option>
                  </select>
                  <svg viewBox="0 0 8 5" width="8" height="5" fill="none" class="pointer-events-none col-start-2 row-start-1 place-self-center stroke-stone-500 dark:stroke-neutral-400" aria-hidden="true">
                    <path d="M.5.5 4 4 7.5.5" />
                  </svg>
                </div>
              </div>

              <div class="grid gap-y-2 sm:col-span-2">
                <label for="message" :class="labelClass">What is going on?</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  rows="6"
                  required
                  placeholder="A few sentences about the business and what you would like to change."
                  :aria-invalid="errors.message ? 'true' : undefined"
                  :aria-describedby="errors.message ? 'message-error' : undefined"
                  :class="inputClass"
                />
                <p v-if="errors.message" id="message-error" class="text-base/7 text-red-700 sm:text-sm/6 dark:text-red-400">
                  {{ errors.message }}
                </p>
              </div>

              <!-- Spam trap: hidden from people and assistive technology. -->
              <div class="absolute -left-[9999px]" aria-hidden="true">
                <label for="website">Website</label>
                <input id="website" v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off">
              </div>

              <div class="flex flex-col gap-y-4 sm:col-span-2" aria-live="polite">
                <p v-if="status === 'error'" class="flex gap-x-2 text-base/7 text-red-700 sm:text-sm/6 dark:text-red-400">
                  <ExclamationCircleIcon class="size-5 h-lh shrink-0 fill-current" aria-hidden="true" />
                  {{ Object.keys(errors).length ? 'Please check the highlighted fields.' : 'Something went wrong sending your note. Please try again.' }}
                </p>
                <div>
                  <UiButton type="submit" :disabled="status === 'sending'">
                    {{ status === 'sending' ? 'Sending…' : 'Send inquiry' }}
                  </UiButton>
                </div>
              </div>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

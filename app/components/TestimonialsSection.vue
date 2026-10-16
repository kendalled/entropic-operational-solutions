<script setup lang="ts">
// PLACEHOLDER SOCIAL PROOF: every quote, name, role, and photo below is
// invented filler for layout. Replace with real, approved client
// testimonials before launch, or remove this section.
const testimonials = [
  {
    quote: 'For the first time I can read our monthly numbers and know what to change. The owner review is the most useful hour of my month.',
    name: 'Jordan Avery',
    role: 'Owner, placeholder kava bar',
    avatar: '/images/placeholders/avatars/avatar-3.webp',
  },
  {
    quote: 'They mapped how memberships, payments, and emails actually fit together, then built it so I can run it without calling anyone.',
    name: 'Sam Rivera',
    role: 'Founder, placeholder creator studio',
    avatar: '/images/placeholders/avatars/avatar-7.webp',
  },
  {
    quote: 'The written scope told us exactly what we were getting and what we were not. No surprises at the end, just a clean handoff.',
    name: 'Taylor Brooks',
    role: 'Director, placeholder nonprofit',
    avatar: '/images/placeholders/avatars/avatar-12.webp',
  },
]
</script>

<template>
  <!-- PLACEHOLDER SOCIAL PROOF: testimonials section. See the note in the script block. -->
  <section aria-labelledby="testimonials-heading" class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <SectionHeading eyebrow="Client perspectives" description="What owners say after an engagement wraps up.">
        <template #title>
          <span id="testimonials-heading">Clearer numbers, calmer operations.</span>
        </template>
      </SectionHeading>

      <ul role="list" class="mt-16 grid gap-x-8 gap-y-12 lg:grid-cols-3">
        <li v-for="(item, index) in testimonials" :key="item.name" v-reveal="index * 100" class="flex">
          <figure class="flex flex-1 flex-col justify-between gap-10 border-t border-stone-950/10 pt-8 dark:border-white/10">
            <blockquote class="font-display text-2xl text-pretty text-stone-950 dark:text-white">
              <p class="relative before:absolute before:inline before:-translate-x-full before:content-['\201C'] after:inline after:content-['\201D']">{{ item.quote }}</p>
            </blockquote>
            <figcaption class="flex items-center gap-x-4">
              <img
                :src="item.avatar"
                alt=""
                width="48"
                height="48"
                loading="lazy"
                class="size-12 shrink-0 rounded-full bg-stone-100 outline-1 -outline-offset-1 outline-black/5 dark:bg-neutral-800 dark:outline-white/10"
              >
              <div class="min-w-0">
                <div class="text-base/7 font-semibold text-stone-950 sm:text-sm/6 dark:text-white">
                  {{ item.name }}
                </div>
                <div class="text-base/7 text-stone-600 sm:text-sm/6 dark:text-neutral-400">
                  {{ item.role }}
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

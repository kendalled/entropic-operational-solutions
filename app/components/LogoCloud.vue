<script setup lang="ts">
const logos = ['align', 'artifact', 'axiom', 'concise', 'looply', 'pinelabs']
</script>

<template>
  <!--
    PLACEHOLDER SOCIAL PROOF: these are stock logos from the ui.sh assets API,
    not clients. Replace with real client logos (with permission) or remove
    this section before launch. Files: public/images/placeholders/logos/.
  -->
  <div>
    <p class="text-base/7 text-stone-500 sm:text-sm/6 dark:text-neutral-400">
      Working with independent businesses and community organizations
    </p>
    <ul role="list" class="mt-8 grid grid-cols-3 items-center gap-x-8 gap-y-10 sm:grid-cols-6">
      <li v-for="logo in logos" :key="logo" class="flex">
        <img :src="`/images/placeholders/logos/${logo}.svg`" alt="Placeholder client logo" width="96" height="24" class="h-6 w-auto dark:hidden">
        <img :src="`/images/placeholders/logos/${logo}-dark.svg`" alt="Placeholder client logo" width="96" height="24" class="h-6 w-auto not-dark:hidden">
      </li>
    </ul>
  </div>
</template>

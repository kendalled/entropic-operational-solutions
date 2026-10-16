<script setup lang="ts">
import {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  MapIcon,
  PresentationChartLineIcon,
  ViewfinderCircleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

// Maps the `icon` field in content/services/*.yml to a Heroicon.
const icons: Record<string, Component> = {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  MapIcon,
  PresentationChartLineIcon,
  ViewfinderCircleIcon,
  WrenchScrewdriverIcon,
}

defineProps<{ name: string }>()
</script>

<template>
  <component :is="icons[name] ?? BanknotesIcon" class="size-6 shrink-0" aria-hidden="true" />
</template>

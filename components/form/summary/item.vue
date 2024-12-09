<template>
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium text-neutral-900">{{ title }}</h3>
      <span class="text-sm font-semibold text-primary">{{ formatPrice(price) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  price: number
}

defineProps<Props>()

function formatPrice(price: number): string {
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF'
  }).format(price)
}
</script>

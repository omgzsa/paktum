<script setup lang="ts">
import { useScroll, useElementBounding } from '@vueuse/core'

const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const progressPercentage = computed(() => 
  Math.round((props.currentStep / props.totalSteps) * 100)
)

const summaryRef = ref<HTMLElement | null>(null)
const isSticky = ref(false)

const summaryItems = ref([
  { title: 'Készpénz átvételi minta', price: 2500 },
  { title: 'Bútorleltár', price: 1500 },
  { title: 'Készpénz átvételi elismervény minta', price: 2500 },
])

const formatTotalPrice = computed(() => {
  const total = summaryItems.value.reduce((sum, item) => sum + item.price, 0)
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF'
  }).format(total)
})

// Scroll handling
const { top: summaryTop } = useElementBounding(summaryRef)
const { y: scrollY } = useScroll(window)

watch(scrollY, (newY) => {
  if (!summaryRef.value) return
  const threshold = 50
  isSticky.value = newY > summaryTop.value + threshold
})
</script>

<template>
  <div 
    ref="summaryRef"
    :class="[
      'space-y-4 transition-all duration-300',
      isSticky ? 'fixed top-4 left-4 w-[300px] z-50' : ''
    ]"
  >
    <div class="p-6 space-y-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold text-neutral-900">Összegzés</h2>
      
      <div class="space-y-2">
        <FormSummaryItem
          v-for="item in summaryItems"
          :key="item.title"
          v-bind="item"
        />
      </div>

      <div class="pt-4 border-t">
        <UProgress
          :value="progressPercentage"
          color="primary"
          class="w-full"
          size="lg"
        />
        <div class="flex justify-between text-sm text-neutral-600">
          <span>Step {{ currentStep }} of {{ totalSteps }}</span>
          <span>{{ progressPercentage }}% Complete</span>
        </div>
      </div>

      <div class="pt-4 border-t">
        <div class="flex items-center justify-between">
          <span class="text-base font-semibold">Teljes összeg:</span>
          <span class="text-lg font-bold text-primary">
            {{ formatTotalPrice }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

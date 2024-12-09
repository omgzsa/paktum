<script setup lang="ts">
import { useScroll, useElementBounding } from '@vueuse/core';

const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const progressBarRef = ref<HTMLElement | null>(null)
const isSticky = ref(false)

const progressPercentage = computed(() => 
  Math.round((props.currentStep / props.totalSteps) * 100)
)

// Get form element for scroll calculations
const formElement = computed(() => {
  if (!progressBarRef.value) return null
  return progressBarRef.value.closest('main')?.querySelector('form')
})

// Use element bounding for more accurate position tracking
const { top: progressBarTop } = useElementBounding(progressBarRef)

// Window scroll position
const { y: scrollY } = useScroll(window, { behavior: 'smooth' })

// Form element bounding
const formBounding = ref({ top: 0, bottom: 0 })

// Initialize form position
onMounted(() => {
  nextTick(() => {
    if (formElement.value) {
      const rect = formElement.value.getBoundingClientRect()
      formBounding.value = {
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY
      }
    }
  })
})

// Watch scroll position to toggle sticky state
watch(scrollY, (newY) => {
  if (!progressBarRef.value || !formElement.value) return
  
  const threshold = 50 // Adjust this value to change when the bar becomes sticky
  const bottomThreshold = formBounding.value.bottom - window.innerHeight + 1200

  isSticky.value = newY > progressBarTop.value + threshold && newY < bottomThreshold
})

// Toggle sticky state on click
function toggleSticky() {
  isSticky.value = !isSticky.value
  
  if (isSticky.value) {
    window.scrollTo({
      top: Math.max(0, scrollY.value - 100),
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <div 
    ref="progressBarRef"
    :class="[
      'w-full space-y-2 transition-all duration-300 cursor-pointer',
      isSticky ? 'p-2 bg-neutral-50/90 dark:bg-neutral-950/60 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 px-4 mx-auto' : ''
    ]"
    @click="toggleSticky"
  >
    <div class="w-full mx-auto sm:max-w-2xl">
      <UProgress
        :value="progressPercentage"
        color="primary"
        class="mb-2"
        size="lg"
        :class="{ 'transition-all p-3': isSticky }"
      />
      <div class="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <span>Step {{ currentStep }} of {{ totalSteps }}</span>
        <!-- <Icon :name="isSticky ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" /> -->
        <span>{{ progressPercentage }}% Complete</span>
      </div>
    </div>
  </div>
</template>

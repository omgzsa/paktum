<script setup>
import { useFloating, offset, flip, shift, size } from '@floating-ui/vue';

const props = defineProps({
  label: String,
  width: {
    type: [String, Number],
    default: 'auto',
  },
  crossAxis: Number,
});

const isHovered = ref(false);
const isTooltipHovered = ref(false);

const reference = ref(null);
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom-start',
  middleware: [
    offset({ crossAxis: props.crossAxis, mainAxis: 4 }),
    flip(),
    shift(),
    size({
      apply({ availableWidth, elements }) {
        // Apply dynamic width based on prop or available space
        const tooltipWidth =
          props.width === 'auto'
            ? `${Math.max(0, availableWidth)}px`
            : `${props.width}px`;
        Object.assign(elements.floating.style, {
          width: tooltipWidth,
        });
      },
    }),
  ],
});

const showTooltip = () => {
  isHovered.value = true;
};

const hideTooltip = () => {
  // if (!isTooltipHovered.value) {
  //   setTimeout(() => {
  //     isHovered.value = false;
  //   }, 200);
  // }
  isHovered.value = false;
};

const tooltipHovered = () => {
  isTooltipHovered.value = true;
};

const tooltipLeft = () => {
  // setTimeout(() => {
  //   isTooltipHovered.value = false;
  //   isHovered.value = false;
  // }, 100);
  isTooltipHovered.value = false;
  isHovered.value = false;
};
</script>

<template>
  <div>
    <span
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      ref="reference"
      class="inline-flex items-center text-sm font-semibold underline transition cursor-default hover:transition-transform hover:transform hover:scale-105 group hover:underline-offset-2 decoration-neutral-400 hover:decoration-neutral-950 dark:hover:decoration-neutral-200"
    >
      <Icon
        name="heroicons:light-bulb"
        class="mr-1 text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-neutral-200"
        size="18"
      />
      <span
        class="text-xs font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200"
      >
        {{ label }}
      </span>
    </span>
    <Transition name="fade">
      <div
        @mouseenter="tooltipHovered"
        @mouseleave="tooltipLeft"
        v-if="isHovered || isTooltipHovered"
        ref="floating"
        :style="floatingStyles"
        class="z-50 px-6 py-5 space-y-4 leading-normal shadow-md rounded-2xl md:max-w-xl bg-neutral-900 dark:border border-neutral-700"
      >
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

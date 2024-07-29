<template>
  <div>
    <div class="cursor-pointer grid grid-cols-[auto_auto_auto] items-start justify-start gap-3 text-left">
      <div v-if="isDefault" class="relative flex items-center justify-center w-6 h-6 rounded -top-0.5 xs:-top-1 xs:w-7 xs:h-7 bg-zinc-200 dark:bg-zinc-700">
        <p class="mb-0.5 text-sm font-medium dark:text-white">
          §
        </p>
      </div>
      <div class="w-6 h-6 xs:w-7 xs:h-7" v-else></div> <!-- This placeholder div ensures the input always starts in the second column -->
      <input
        v-model="value"
        type="radio"
        :id="`${id}-${name}`"
        class="mt-1"/>
      <label :for="`${id}-${name}`" class="">
        <p>
          {{ label }}
        </p>
      </label>
    </div>
    <span :name="name" class="text-xs text-red-600">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: String,
  name: {
    type: String,
    default: '',
  },
  label: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
/*  */
</style>

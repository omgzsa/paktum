<script lang="ts" setup>
const props = defineProps<{
  name: string;
  type?: string;
  label?: string;
  labelEnd?: string;
  placeholder?: string;
  isDisabled?: boolean;
}>();

const model = defineModel();

const { value, errorMessage } = useField(
  `${props.name}`,
  undefined,
  {
    syncVModel: true,
    initialValue: model.value,
  }
);

const inputId = `${props.name}-input`;
</script>

<template>
  <div class="space-y-1">
    <div class="flex items-center gap-2">
      <label
        v-if="props.label"
        :for="inputId"
        class="text-xs md:text-sm whitespace-nowrap"
      >
        {{ props.label }}
      </label>
      <input
        v-model="value"
        :id="inputId"
        :disabled="props.isDisabled"
        :type="props.type || 'text'"
        :placeholder="props.placeholder"
        class="mx-1 inline flex-wrap h-6 transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100"
        :class="{ 'cursor-not-allowed opacity-50': props.isDisabled }"
      />
      <span v-if="props.labelEnd" class="text-xs md:text-sm">{{ props.labelEnd }}</span>
    </div>
    <!-- Error message rendering -->
    <span v-if="errorMessage" class="text-xs text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: String,
  name: String,
  label: String,
  optionId: String,
  questionId: Number,
  isDefault: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const { value, errorMessage } = useField(props.name || '', undefined, {
  syncVModel: true,
  // checkedValue: props.optionId,
});
</script>

<template>
  <div>
    <div
      class="grid grid-cols-[auto_auto_auto] items-start justify-start gap-1.5 xs:gap-3 text-left"
    >
      <InputTooltip
        v-if="props.isDefault"
        label="§"
        text="Jogszabályi alapállapot"
      />
      <div class="w-5 h-5 xs:w-6 xs:h-6" v-else></div>
      <!-- This placeholder div ensures the input always starts in the second column -->
      <label
        :for="props.optionId"
        class="flex items-start gap-2 cursor-pointer"
      >
        <input
          v-model="value"
          :id="props.optionId"
          :value="props.optionId"
          :name="props.name"
          type="radio"
          class="relative transition-all border border-zinc-500 appearance-none cursor-pointer md:mt-0.5 -z-10 peer checked:border-paktum-500 checked:bg-paktum-500 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
          @change="emit('update:modelValue', value)"
        />
        <p class="text-xs md:text-sm">{{ props.label }}</p>
      </label>
    </div>
    <span v-if="errorMessage" class="text-xs text-red-600">{{
      errorMessage
    }}</span>
  </div>
</template>

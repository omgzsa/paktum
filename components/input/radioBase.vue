<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  modelValue: string | undefined;
  name: string;
  label: string;
  optionId?: string;
  questionId?: number;
  isDefault?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const { value, errorMessage } = useField<string>(props.name || '', undefined, {
  syncVModel: true,
});

const emitValues = () => {
  emit('update:modelValue', value.value as string);
};
</script>

<template>
  <div>
    <div
      class="grid grid-cols-[auto_auto] items-start justify-start gap-1.5 xs:gap-3 text-left"
    >
      <InputTooltip
        v-if="props.isDefault"
        label="§"
        text="Jogszabályi alapállapot"
      />
      <div v-else class="w-5 h-5 xs:w-6 xs:h-6"/>
      <label
        :for="props.optionId"
        class="flex items-start gap-1.5 xs:gap-3 cursor-pointer"
      >
        <InputRadio
          :id="props.optionId"
          v-model="value"
          :name="props.name"
          :option-id="props.optionId"
          @change="emitValues"
        />
        <p class="text-xs md:text-sm">{{ props.label }}</p>
      </label>
    </div>
    <span v-if="errorMessage" class="text-xs text-red-600">{{
      errorMessage
    }}</span>
  </div>
</template>

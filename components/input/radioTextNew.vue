<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: Object,
  name: String,
  labelStart: String,
  labelEnd: String,
  optionId: String,
  questionId: Number,
  isDefault: Boolean,
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  width: Number,
});

const emit = defineEmits(['update:modelValue']);

const { value: radioValue, errorMessage: radioError } = useField<
  string | undefined
>(props.name || '', undefined, {
  syncVModel: true,
});

const { value: numberValue, errorMessage: numberError } = useField<
  number | undefined
>(`textInput-${props.optionId}`, undefined, {
  syncVModel: true,
});

const emitBothValues = () => {
  emit('update:modelValue', {
    modelValue: radioValue.value,
    textValue: numberValue.value,
  });
};

const isDisabled = computed(() => radioValue.value !== props.optionId);
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

      <label
        :for="props.optionId"
        class="flex items-start gap-2 cursor-pointer"
      >
        <InputRadio
          v-model="radioValue"
          :name="props.name"
          :option-id="props.optionId"
          @update:modelValue="emitBothValues"
        />

        <InputLabelWrapper>
          <template #label-start>
            <p class="text-xs md:text-sm">{{ props.labelStart }}</p>
          </template>
          <InputNumber
            v-model="numberValue"
            :min="props.min"
            :max="props.max"
            :step="props.step"
            :width="props.width"
            :disabled="isDisabled"
            @update:modelValue="emitBothValues"
          />
          <template #label-end>
            <p class="text-xs md:text-sm">{{ props.labelEnd }}</p>
          </template>
        </InputLabelWrapper>
      </label>
    </div>

    <span v-if="radioError" class="text-xs text-red-600">{{ radioError }}</span>
    <span v-if="numberError" class="text-xs text-red-600">{{
      numberError
    }}</span>
  </div>
</template>

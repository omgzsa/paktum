<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  labelStart: string;
  labelCenter: string;
  labelEnd: string;
  optionId: string;
  questionId: number;
  isDefault?: boolean;
  placeholder?: string;
  placeholder2?: string;
  min: number;
  max: number;
  step: number;
  width: number;
}>()

const model = defineModel('option') as Ref<string>;

const emit = defineEmits(['update:modelValue', 'update:textValues']);

// value = radio button value (optionId) in label
const { value, errorMessage } = useField<string>(props.name || '', 
undefined, {
  syncVModel: true,
  initialValue: model.value,
});

// textValue = text input value in label
const { value: textValue, errorMessage: textError, resetField } = useField(`textInput-${props.optionId}`, undefined, {
    syncVModel: true,
    // initialValue: 0,
  }
);

// textValue2 = text input value in label
const { value: textValueTwo, errorMessage: textError2, resetField: resetField2 } = useField(`textInput2-${props.optionId}`, undefined, {
    syncVModel: true,
    // initialValue: 0,
  }
);

const handleInput = (e: any) => {
  emitValues();
};

const emitValues = () => {
  emit('update:modelValue', value.value);
  emit('update:textValues', {
    textValue: textValue.value,
    textValueTwo: textValueTwo.value,
  });
  return;
};

watch(value, (newValue) => {
  if (newValue !== props.optionId) {
    resetField();
    resetField2();
  }
});

// computed property to make labelStart an array of words
const labelStartArray = computed(() => props.labelStart?.split(' '));
const labelCenterArray = computed(() => props.labelCenter?.split(' '));
const labelEndArray = computed(() => props.labelEnd?.split(' '));

const isDisabled = computed(() => value.value !== props.optionId);
</script>

<template>
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
        v-model="value"
        :name="props.name"
        :option-id="props.optionId"
        @change="emitValues"
      />
      <InputLabelWrapper>
        <template #label-start>
          <p v-for="(w, index) in labelStartArray" :key="index" class="text-xs md:text-sm">{{ w }}</p>
        </template>
        <input
          v-model="textValue"
          :disabled="isDisabled"
          type="number"
          :placeholder="props.placeholder"
          :min="props.min"
          :max="props.max"
          :step="props.step"
          :style="{ width: `${props.width}px` }"
          class="mx-1 inline flex-wrap h-[22px] transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100"
          :class="{ 'cursor-not-allowed opacity-50': isDisabled }"
          @input="handleInput"
        >
        <p v-for="(w, index) in labelCenterArray" :key="index" class="text-xs md:text-sm">
          {{ w }}
        </p>
        <input
          v-model="textValueTwo"
          :disabled="isDisabled"
          type="number"
          :placeholder="props.placeholder2"
          :min="props.min"
          :max="props.max"
          :step="props.step"
          :style="{ width: `${props.width}px` }"
          class="mx-1 inline flex-wrap h-[22px] transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100"
          :class="{ 'cursor-not-allowed opacity-50': isDisabled }"
          @input="handleInput"
        >
        <template #label-end>
          <p v-for="(w, index) in labelEndArray" :key="index" class="text-xs md:text-sm">{{ w }}</p>
        </template>
      </InputLabelWrapper>
    </label>
  </div>
  <span v-if="textError" class="text-xs text-red-600">{{ textError }}</span>
  <span v-if="textError2" class="text-xs text-red-600">{{ textError2 }}</span>
  <span v-if="errorMessage" class="text-xs text-red-600">{{
    errorMessage
  }}</span>
</template>

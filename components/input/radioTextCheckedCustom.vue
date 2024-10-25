<script lang="ts" setup>
// import * as yup from 'yup';
import { useField } from 'vee-validate';

const props = defineProps<{
  // modelValue?: { optionId: string; textValue?: string, checkedValues?: string[] };
  // modelValue: string | number | undefined;
  name: string;
  labelStart: string;
  labelEnd: string;
  optionId: string;
  questionId: number;
  isDefault?: boolean;
  extraOptions?: { id: number, label: string }[];
  min: number;
  max: number;
  step: number;
  width: number;
}>()

const checkedOptions = ref<string[]>([]);
const isCustomChecked = ref<boolean>(false);

const emit = defineEmits(['update:modelValue', 'update:textValue', 'update:checkedValues']);

// value = radio button value (optionId) in label
const { value, errorMessage } = useField<string>(props.name || '', 
undefined, {
  syncVModel: true,
});

// textValue = text input value in label
const { value: textValue, errorMessage: textError } = useField(`textInput-${props.optionId}`, undefined, {
    syncVModel: true,
  }
);

// customInput = text input value appended to checkedOptions array
const { value: customInput } = useField<string>(`customInput-${props.optionId}`, 
undefined, {
  syncVModel: true,
});

const handleInput = (e: any) => {
  emitValues();
};

const handleCheckbox = () => {
  emitValues();
};

const handleCustomInput = (value: string) => {
  //
};

const emitValues = () => {
  emit('update:modelValue', value.value);
  emit('update:textValue', textValue.value);
  emit('update:checkedValues', checkedOptions.value);
  return;
};

// computed property to make labelStart an array of words
const labelStartArray = computed(() => props.labelStart?.split(' '));
const labelEndArray = computed(() => props.labelEnd?.split(' '));

const isDisabled = computed(() => value.value !== props.optionId);

// watcher for customInput
watch(customInput, (newVal, oldVal) => {
  if (oldVal) {
    checkedOptions.value = checkedOptions.value.filter((item) => item !== oldVal);
  }

  if (newVal) {
    checkedOptions.value.push(newVal);
  }

  if(newVal === '') {
    checkedOptions.value = checkedOptions.value.filter((item) => item !== oldVal);
  }

  emitValues();
});
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
    <div class="w-5 h-5 xs:w-6 xs:h-6" v-else></div>
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
          @input="handleInput"
          :disabled="isDisabled"
          type="number"
          :min="props.min"
          :max="props.max"
          :step="props.step"
          :style="{ width: `${props.width}px` }"
          class="mx-1 inline flex-wrap h-[22px] transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100"
          :class="{ 'cursor-not-allowed opacity-50': isDisabled }"
          />
          <template #label-end>
          <p v-for="(w, index) in labelEndArray" :key="index" class="text-xs md:text-sm">{{ w }}</p>
        </template>
      </InputLabelWrapper>
    </label>
    <div v-if="extraOptions" class="col-start-2 pl-5 xs:pl-7 space-y-1.5 col-span-full w-full">
      <InputChbox
        v-for="(option, index) in props.extraOptions"
        v-model="checkedOptions"
        @change="handleCheckbox"
        :key="index"
        :id="`${index}`"
        :name="`arrayInput-${props.optionId}`"
        :label="option.label"
        :disabled="isDisabled"
      />
      <!-- one static InputChbox with label 'egyéb' and a text input -->
      <InputChboxText
        label="egyéb"
        :name="`customInput-${props.optionId}`"
        v-model:custom-input.lazy="customInput"
        @update:custom-input="handleCustomInput"
        @update:is-checked="isCustomChecked = $event"
        :disabled="isDisabled"
      />
    </div>
  </div>
  <span v-if="textError" class="text-xs text-red-600">{{ textError }}</span>
  <span v-if="errorMessage" class="text-xs text-red-600">{{
    errorMessage
  }}</span>
</template>

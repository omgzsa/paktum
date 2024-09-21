<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: String,
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

const { value, errorMessage } = useField(props.name || '', undefined, {
  syncVModel: true,
});

const { value: textValue, errorMessage: textError } = useField(
  `textInput-${props.optionId}`,
  {
    syncVModel: true,
  }
);

const handleInput = () => {
  emitBothValues();
};

const emitBothValues = () => {
  emit('update:modelValue', {
    modelValue: value.value,
    textValue: textValue.value,
  });
};

const isDisabled = computed(() => value.value !== props.optionId);
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
        <input
          v-model="value"
          :id="props.optionId"
          :value="props.optionId"
          :name="props.name"
          type="radio"
          class="relative mt-0.5 transition-all border border-zinc-500 appearance-none cursor-pointer md:mt-1.5 -z-10 peer checked:border-paktum-500 checked:bg-paktum-500 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
          @change="emitBothValues"
        />
        <div class="flex flex-wrap items-center gap-x-2">
          <p class="text-xs md:text-sm">{{ props.labelStart }}</p>
          <input
            v-model="textValue"
            @input="handleInput"
            :disabled="isDisabled"
            type="number"
            :min="props.min"
            :max="props.max"
            :step="props.step"
            :class="`w-${props.width} h-6 md:h-7 transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100`"
          />
          <p class="text-xs md:text-sm">{{ props.labelEnd }}</p>
        </div>
      </label>
    </div>
    <span v-if="textError" class="text-xs text-red-600">{{ textError }}</span>
    <span v-if="errorMessage" class="text-xs text-red-600">{{
      errorMessage
    }}</span>
  </div>
</template>

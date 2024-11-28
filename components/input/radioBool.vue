<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  modelValue: boolean;
  name: string;
  label: string;
  isDefault?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const { value } = useField<boolean>(props.name, undefined, {
  syncVModel: true,
  initialValue: props.modelValue as boolean,
});

const emitValues = (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  emit('update:modelValue', isChecked);
  value.value = isChecked;
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
        :for="props.name"
        class="flex items-start gap-1.5 xs:gap-3 cursor-pointer"
      >
        <input
          :id="props.name"
          v-model="value"
          :name="props.name"
          :checked="props.modelValue"
          :value="props.modelValue"
          type="radio"
          class=""
          @change="emitValues"
        >
        <p class="text-xs md:text-sm">{{ props.label }}</p>
      </label>
    </div>
  </div>
</template>

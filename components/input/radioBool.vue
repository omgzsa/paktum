<script setup lang="ts">
interface Props {
  modelValue: boolean;
  name: string;
  label: string;
  groupValue: string;
  isDefault?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

// Generate a unique ID for the input
const { value } = useField<boolean>(props.name, undefined, {
  syncVModel: true,
  initialValue: props.modelValue as boolean,
});

const handleChange = () => {
  emit("update:modelValue", value.value);
};
</script>

<template>
  <div class="radio-bool-wrapper">
    <div
      class="grid grid-cols-[auto_auto] items-start justify-start gap-1.5 xs:gap-3 text-left"
    >
      <InputTooltip v-if="isDefault" label="§" text="Jogszabályi alapállapot" />
      <div v-else class="w-5 h-5 xs:w-6 xs:h-6" />
      <label
        :for="name"
        class="flex items-start gap-1.5 xs:gap-3 cursor-pointer"
      >
        <input
          :id="name"
          type="radio"
          :name="groupValue"
          :checked="modelValue"
          class="radio-input"
          @change="handleChange"
        />
        <span class="text-xs md:text-sm">{{ label }}</span>
      </label>
    </div>
  </div>
</template>

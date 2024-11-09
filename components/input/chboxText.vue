<script lang="ts" setup>
const props = defineProps<{
  disabled: boolean;
  label: string;
  name: string;
}>();

const emit = defineEmits(['update:customInput', 'update:isChecked']);

const model = defineModel<string>('customInput');
const customInputRef = ref<HTMLTextAreaElement | null>(null);
const isChecked = ref<boolean>(false);

const handleCheck = (e: any) => {
  isChecked.value = e.target.checked;
  emit('update:isChecked', isChecked.value);

  if (isChecked.value) {
    nextTick(() => {
      customInputRef.value?.focus();
    });
  }
};

const autoResize = () => {
  if (customInputRef.value) {
    customInputRef.value.style.height = 'auto';
    customInputRef.value.style.height = `${customInputRef.value.scrollHeight}px`;
  }
};
</script>

<template>
  <label 
    class="flex items-center gap-2 text-xs cursor-pointer xs:gap-3 md:text-sm"
    :class="{ 'cursor-not-allowed': props.disabled }"
  >
    <input
      type="checkbox"
      class=""
      :disabled="props.disabled"
      :class="{ 'opacity-50 cursor-not-allowed checked:bg-neutral-500 checked:border-neutral-300 checked:hover:bg-neutral-500': props.disabled }"
      @change="handleCheck"
    >
      <p 
        class="text-xs md:text-sm" 
        :class="{ 
          'cursor-not-allowed': props.disabled, 
          'text-neutral-950 dark:text-neutral-200': isChecked 
        }"
      >
        {{ props.label }}
      </p>
    <textarea
      ref="customInputRef"
      v-model.lazy="model"
      :name="props.name"
      :disabled="!isChecked"
      rows="1"
      class="max-w-xl h-[22px] transition-all resize-none overflow-hidden border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-600"
      :class="{ 'cursor-not-allowed opacity-50': !isChecked }"
      @input="autoResize"
    />
  </label>
</template>

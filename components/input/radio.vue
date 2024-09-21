<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  name: String,
  optionId: String,
});

const emit = defineEmits(['update:modelValue']);

const { value } = useField(props.name || '', undefined, {
  syncVModel: true,
});

const emitValue = () => {
  emit('update:modelValue', value.value);
};
</script>

<template>
  <input
    v-model="value"
    :id="props.optionId"
    :value="props.optionId"
    :name="props.name"
    type="radio"
    class="relative mt-0.5 transition-all border border-zinc-500 appearance-none cursor-pointer md:mt-1.5 -z-10 peer checked:border-paktum-500 checked:bg-paktum-500 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
    @change="emitValue"
  />
</template>

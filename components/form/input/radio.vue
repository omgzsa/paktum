<template>
  <div>
    <div class="relative flex items-start">
      <div v-if="isDefault" class="absolute flex items-center justify-center rounded w-7 h-7 bottom-1 -left-10 bg-zinc-200">
        <p class="font-medium">
          §
        </p>
      </div>
      <input
        type="radio"
        :id="`${id}-${name}`"
        class=""
      />
      <label :for="id" class="">
        <p>
          {{ label }}
        </p>
      </label>
    </div>
    <span :name="name" class="text-xs text-red-600">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: String,
  id: String,
  name: {
    type: String,
    default: '',
  },
  label: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const { value, errorMessage } = useField(`${props.name}`, undefined, {
  syncVModel: true,
});

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
/*  */
</style>

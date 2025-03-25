<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
    modelValue: Boolean,
    name: String,
    label: String,
    price: String,
});

const { value, checked, handleChange, errorMessage } = useField(
    () => props.name,
    undefined,
    {
        syncVModel: true,
        type: 'checkbox',
        checkedValue: true,
        uncheckedValue: false,
    },
);

onUnmounted(() => {
    value.value = false;
});
</script>

<template>
    <label
        class="flex items-start gap-2 text-xs cursor-pointer sm:gap-3 sm:text-sm"
    >
        <input
            v-model="value"
            :checked="checked"
            type="checkbox"
            class="mt-0.5"
            @change="handleChange"
        />
        <p class="text-xs md:text-sm">
            {{ label }}
        </p>
        <span
            v-if="price && checked === true"
            class="ml-auto text-xs italic text-neutral-700 dark:text-neutral-400"
        >
            + {{ price }} Ft
        </span>
    </label>
    <!-- <span v-if="errorMessage" class="text-xs text-red-600">{{
    errorMessage
  }}</span> -->
</template>

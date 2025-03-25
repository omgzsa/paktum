<script setup lang="ts">
import { format } from 'date-fns';

const props = defineProps<{
    name: string;
}>();

// defineModel with default today
const date = defineModel<Date | number>({ default: new Date() });

const { value, resetField } = useField<Date | number>(
    `${props.name}`,
    undefined,
    {
        syncVModel: true,
        initialValue: date.value,
    },
);

onUnmounted(() => {
    resetField();
});
</script>

<template>
    <UPopover :popper="{ placement: 'top-start' }">
        <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="format(date, 'yyy. MMM. d.')"
            variant="ghost"
            color="paktum"
            block
            class="dark:text-paktum-500 text-paktum-600"
        />

        <template #panel="{ close }">
            <DatePickerBase
                v-model="value"
                is-required
                @close="close"
            />
        </template>
    </UPopover>
</template>

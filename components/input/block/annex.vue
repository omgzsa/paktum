<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true,
    },
    inputLabel: {
        type: String,
        required: true,
    },
    tooltipLabel: {
        type: String,
        default: 'Mire jó ez a melléklet?',
    },
    tooltipContent: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})
const annex = defineModel<boolean>()
</script>

<template>
    <div class="border-b border-neutral-200 dark:border-neutral-800 space-y-4">
        <InputToggle v-model="annex" :label="inputLabel" :name="name" />
        <div class="flex justify-between">
            <AppTooltip class="" :width="300" :label="tooltipLabel">
                <template #content>
                    <p
                        class="text-xs font-normal tracking-wide text-neutral-100"
                    >
                        {{ tooltipContent }}
                    </p>
                </template>
            </AppTooltip>
            <p class="text-xs italic text-neutral-700 dark:text-neutral-400">
                + {{ price }} Ft
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: String,
    placement: String,
    subText: String,
    price: String,
    bordered: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div
        class="flex flex-col max-w-2xl px-2 py-4 mx-auto space-y-5 border-b xs:py-5 xs:px-4 md:px-5 lg:px-7 md:py-7 lg:py-9 border-b-neutral-200 dark:border-b-neutral-600"
        :class="{
            'border rounded-md bg-neutral-100/90 z-0 border-neutral-500 border-b-neutral-500 dark:bg-neutral-900 dark:border-neutral-700':
                bordered,
        }"
    >
        <slot name="hint" />
        <h2
            v-if="title"
            class="flex items-center justify-between gap-2"
        >
            <div>
                <span>{{ placement }}</span> {{ title }}
            </div>
            <div
                v-if="price"
                class="text-xs italic font-normal text-neutral-700 dark:text-neutral-400"
            >
                {{ price }}
            </div>
        </h2>
        <p v-if="subText">{{ subText }}</p>
        <div class="space-y-3">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string | undefined
    subTitle: string | undefined
}>()
</script>

<template>
    <div class="flex flex-col items-start md:items-center pt-6">
        <div class="max-w-3xl">
            <h1 class="mb-1 dark:text-neutral-900">{{ title }}</h1>
            <h2
                class="uppercase tracking-wider text-lg font-light dark:text-neutral-900"
            >
                {{ subTitle }}
            </h2>
        </div>
    </div>
</template>

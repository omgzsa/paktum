<script setup lang="ts">
defineProps<{
    title: string | undefined
    subTitle: string | undefined
}>()
</script>

<template>
    <div class="flex flex-col items-center">
        <div>
            <h1>{{ title }}</h1>
            <h2 class="uppercase tracking-wider font-light">
                {{ subTitle }}
            </h2>
        </div>
    </div>
</template>

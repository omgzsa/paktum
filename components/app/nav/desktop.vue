<script lang="ts" setup>
//
</script>

<template>
    <nav class="flex items-center justify-between py-4">
        <ClientOnly>
            <NuxtLink to="/">
                <NuxtImg
                    src="/paktum-logo.svg"
                    width="168"
                    height="40"
                    class="w-24"
                />
            </NuxtLink>
            <template #fallback>
                <p class="font-bold text-2xl">
                    pak<span class="text-white">tum</span>
                </p>
            </template>
        </ClientOnly>
        <ul class="space-x-4">
            <NuxtLink
                to="/blog"
                class="hover:underline underline-offset-4 dark:text-neutral-900"
                >Blog</NuxtLink
            >
            <NuxtLink
                to="/gyik"
                class="hover:underline underline-offset-4 dark:text-neutral-900"
                >GYIK</NuxtLink
            >
        </ul>
        <TheColorSwitcher />
    </nav>
</template>

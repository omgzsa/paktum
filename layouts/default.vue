<script lang="ts" setup>
//
</script>

<template>
    <div>
        <AppHeader>
            <template #navigation>
                <AppNavDesktop />
            </template>
        </AppHeader>
        <main>
            <slot />
        </main>
        <footer class="bg-neutral-800 py-4">
            <UContainer as="section">
                <NuxtLink to="/">
                    <NuxtImg
                        src="/paktum-logo-black.svg"
                        width="168"
                        height="40"
                        class="w-20"
                    />
                </NuxtLink>
            </UContainer>
        </footer>
    </div>
</template>

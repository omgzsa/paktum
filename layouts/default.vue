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
        <footer>// DEFAULT FOOTER</footer>
    </div>
</template>

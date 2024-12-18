<script lang="ts" setup>
const { restoreUserSession } = useAuth()

onMounted(async () => {
    await restoreUserSession()
})
</script>

<template>
    <div>
        <NuxtLoadingIndicator
            color="repeating-linear-gradient(to right,#6de8b4 0%,#10d38d 50%,#037955 100%)"
        />
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
        <UModals />
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(0.2rem);
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
    filter: neutralscale(1);
}
</style>

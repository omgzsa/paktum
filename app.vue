<script setup>
//
</script>

<template>
  <div class="transition-all">
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,#6de8b4 0%,#10d38d 50%,#037955 100%)"
    />
    <NuxtRouteAnnouncer />
    <NuxtPage />
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
  filter: blur(0.25rem);
}
</style>

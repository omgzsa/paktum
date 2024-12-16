<script lang="ts" setup>
// const router = useRouter();

// function resetRoute() {
//   router.replace({ path: '/berleti', query: {} }).then(() => {
//     // Ensures any reactive state resets after navigation
//     router.go(0); // Forces a reload without leaving the page
//   });
// }
</script>

<template>
  <nav class="flex items-center py-4">
    <ul class="space-x-4">
      <NuxtLink to="/">home</NuxtLink>
      <!-- <NuxtLink to="/berleti">berleti</NuxtLink> -->
      <NuxtLink to="/berleti/lepes/1">berleti</NuxtLink>
      <NuxtLink to="/test">test</NuxtLink>
    </ul>
    <TheColorSwitcher />
  </nav>
</template>

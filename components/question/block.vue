<template>
  <div class="max-w-2xl pb-10 mx-auto space-y-4">
    <h2 class="">1/8. {{ title }}</h2>
    <p v-if="subText">{{ subText }}</p>
    <div class="space-y-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  subText: String,
})
</script>

<style>

</style>
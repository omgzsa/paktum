<template>
  <div class="space-y-4">
    <h2 class="">1/8. {{ title }}</h2>
    <p v-if="subTitle">{{ subTitle }}</p>
    <div class="px-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  subTitle: String,
})
</script>

<style>

</style>
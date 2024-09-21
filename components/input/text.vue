<script setup>
const props = defineProps({
  name: String,
  label: String,
});
const { value, errorMessage, meta } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>

<template>
  <div class="app-input-wrapper">
    <label class="app-input-label" :for="name">
      {{ label }}
    </label>
    <input v-model="value"/>
    <Transition name="pop-bottom">
      <span v-if="errorMessage && meta.touched" role="alert">{{
        errorMessage
      }}</span>
    </Transition>
  </div>
</template>

<style>
.pop-bottom-enter-active,
.pop-bottom-leave-active {
  transition: all 0.2s ease;
}
.pop-bottom-enter-from,
.pop-bottom-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
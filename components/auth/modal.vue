<script setup lang="ts">
const authModal = useAuthModal()
</script>

<template>
  <UModal v-model="authModal.isOpen">
    <UCard :ui="{ ring: 'ring-0', shadow: 'shadow-none' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold">Bejelentkezés</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            @click="authModal.close"
          />
        </div>
      </template>

      <slot />
    </UCard>
  </UModal>
</template>

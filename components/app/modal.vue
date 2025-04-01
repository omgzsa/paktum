<script setup lang="ts">
const isOpen = ref(false)

function open() {
    isOpen.value = true
}

function close() {
    isOpen.value = false
}
</script>

<template>
    <UModal v-model="isOpen">
        <div class="p-4">
            <slot name="title" />
            <slot />
        </div>
    </UModal>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'

const props = defineProps<{
    modelValue: boolean | undefined
    name: string
    label: string
}>()

defineEmits(['update:modelValue'])

const { value } = useField<boolean | undefined>(props.name, undefined, {
    syncVModel: true,
    initialValue: props.modelValue as boolean,
})

onUnmounted(() => {
    value.value = false
})
</script>

<template>
    <div class="flex items-center justify-between gap-4">
        <p class="text-xs md:text-sm">
            {{ label }}
        </p>
        <UToggle v-model="value" color="paktum" size="md" />
    </div>
</template>

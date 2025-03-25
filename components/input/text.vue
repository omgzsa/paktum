<script lang="ts" setup>
const props = defineProps<{
    name: string | number | undefined
    type?: string
    label?: string
    labelEnd?: string | { base: string; sup: string }
    placeholder?: string
    isDisabled?: boolean
    min?: number
    max?: number
    step?: number
    customClass?: string
}>()

const model = defineModel<string | number | Date | undefined>()

const { value, errorMessage } = useField(`${props.name}`, undefined, {
    syncVModel: true,
    initialValue: model.value,
})

const inputId = `${props.name}-input`
</script>

<template>
    <div class="space-y-1">
        <div :class="['flex items-center gap-2', props.customClass]">
            <label
                v-if="props.label"
                :for="inputId"
                class="text-xs md:text-sm whitespace-nowrap"
            >
                {{ props.label }}
            </label>
            <input
                :id="inputId"
                v-model="value"
                :disabled="props.isDisabled"
                :type="props.type || 'text'"
                :placeholder="props.placeholder"
                :min="props.min"
                :max="props.max"
                :step="props.step"
                class="mx-1 inline flex-wrap h-6 transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-600"
                :class="{ 'cursor-not-allowed opacity-50': props.isDisabled }"
            />
            <span
                v-if="typeof labelEnd === 'string'"
                class="text-xs md:text-sm whitespace-nowrap"
            >
                {{ props.labelEnd }}
            </span>
            <span
                v-if="typeof labelEnd === 'object'"
                class="text-xs md:text-sm"
            >
                {{ labelEnd.base }}<sup>{{ labelEnd.sup }}</sup>
            </span>
        </div>
        <!-- Error message rendering -->
        <span v-if="errorMessage" class="text-xs text-red-500">
            {{ errorMessage }}
        </span>
    </div>
</template>

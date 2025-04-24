<script setup lang="ts">
defineProps<{
    title: string
    punchLine: string
}>()

const colorMode = useColorMode()

const emit = defineEmits(['open'])

const handleClick = () => {
    emit('open')
}
</script>

<template>
    <div class="bg-primary-500 pt-10 pb-14 md:pt-12 md:pb-16">
        <UContainer as="section" class="mb-16">
            <div
                class="flex flex-col items-center max-w-4xl mx-auto text-center gap-4 md:gap-6 xl:gap-8"
            >
                <UButton
                    :color="colorMode.value === 'dark' ? 'white' : 'black'"
                    :variant="colorMode.value === 'dark' ? 'solid' : 'outline'"
                    to="/"
                    label="Kiváncsi vagy hogyan működik?"
                    trailing-icon="i-heroicons-arrow-right"
                    size="xs"
                    class="rounded-full"
                />
                <h1 class="xl:text-6xl ext-neutral-900 dark:text-neutral-900">
                    {{ title }}
                </h1>
                <p
                    class="text-sm sm:text-base ext-neutral-900 dark:text-neutral-900"
                >
                    {{ punchLine }}
                </p>
                <UButton
                    :color="colorMode.value === 'dark' ? 'white' : 'black'"
                    variant="solid"
                    to="/"
                    label="Kitöltöm a szerződésem!"
                    size="lg"
                    class="shadow-md"
                    @click="handleClick"
                />
            </div>
        </UContainer>
        <TheHouses />
    </div>
</template>

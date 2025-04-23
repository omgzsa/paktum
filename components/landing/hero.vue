<script setup lang="ts">
const emit = defineEmits(['open'])

const handleClick = () => {
    emit('open')
}

const title = 'Készíts bérleti szerződést online, gyorsan és jogszerűen!'
const punchLine =
    'Készítsd el a teljesen személyre szabható, jogszabályoknak megfelelő bérleti szerződést percek alatt online, magas ügyvédi költségek és akár felesleges papírozás nélkül.'
</script>

<template>
    <div class="bg-primary-500 pt-10 pb-14 md:pt-12 md:pb-16">
        <UContainer as="section" class="mb-16">
            <div
                class="flex flex-col items-center max-w-4xl mx-auto text-center gap-4 md:gap-6 xl:gap-8"
            >
                <UButton
                    color="black"
                    variant="outline"
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
                    color="black"
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
